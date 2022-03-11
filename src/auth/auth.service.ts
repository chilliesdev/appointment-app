import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service';

import { SignupDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
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
    
            return user;
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){
                    throw new ForbiddenException("Credentials taken");
                }
            }

            throw error;
        }

    }
}
