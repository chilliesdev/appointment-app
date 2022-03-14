import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private prisma: PrismaService,
      config: ConfigService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload: {
      sub: number,
      email: string
  }) {
    const user = await this.prisma.user.findUnique({
        where: {
            id: payload.sub
        }
    });

    delete user.hash;
    return user;
  }
}