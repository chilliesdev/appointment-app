import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service';
import passport from 'passport';

import { SigninDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ){ }
    
    async signup(dto: SignupDto) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    hash
                }
            });

            delete user.hash;
    
            return this.signToken(user.id, user.email);
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){
                    throw new ForbiddenException("Credentials taken");
                }
            }

            throw error;
        }

    }

    async signin(dto: SigninDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        console.log(user);

        if(!user) throw new ForbiddenException('Credentials Incorrect');

        const pwMatches = await argon.verify(user.hash, dto.password);

        if(!pwMatches) throw new ForbiddenException('Credentials Incorrect');

        return this.signToken(user.id, user.email);
    }

    googleSigin(req){
        if (!req.user) return 'No user from google';

        return{
            message: 'User information form google',
            user: req.user
        }
    }

    private async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        };

        const secret = this.config.get("JWT_SECRET");

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "30d",
            secret: secret
        });

        return {
            access_token: token
        }
    }
}
