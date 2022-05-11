"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(config) {
        super({
            clientID: "143774114170-idg0a9gjqkqi4j057b4gb4te4a6bk0kp.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth/google/redirect",
            scope: ['email', 'profile']
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { id, name, emails, photos } = profile;
        console.log(profile);
        const user = {
            id: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken
        };
        return done(null, user);
    }
}
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map