import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import PrismaService from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService, config: ConfigService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<import(".prisma/client").User>;
}
export {};
