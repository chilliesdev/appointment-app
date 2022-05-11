import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import PrismaService from '../prisma/prisma.service';
import SigninDto from './dto/signin.dto';
import SignupDto from './dto/signup.dto';
import { GoogleDto } from './dto/google.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: SignupDto): Promise<{
        access_token: string;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
    googleSigin(googleUser: GoogleDto): Promise<{
        access_token: string;
    }>;
    private signToken;
}
