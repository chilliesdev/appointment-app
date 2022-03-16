import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { GoogleDto } from "../dto/google.dto";

export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(config: ConfigService) {
        super({
            clientID: "143774114170-idg0a9gjqkqi4j057b4gb4te4a6bk0kp.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth/google/redirect",
            scope: ['email', 'profile']
        });
    }

    async validate(
        accessToken: string, 
        refreshToken: string, 
        profile: any, 
        done: VerifyCallback
    ): Promise<any> {
        const { id, name, emails, photos } = profile
        console.log(profile);
        // const user: GoogleDto = {
        //     id: id,
        //     email: emails[0].value,
        //     name: `${name.givenName} ${name.familyName}`,
        //     issuer: 'GOOGLE'
        // }
        
        const user = {
            id: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken
        }

        return done(null, user);
    }
}