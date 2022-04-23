import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

import { SigninDto, SignupDto } from './dto';
import { GoogleDto } from './dto/google.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          hash,
        },
      });

      delete user.hash;

      return this.signToken(user.id, user.email, user.name);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials Incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');

    return this.signToken(user.id, user.email, user.name);
  }

  async googleSigin(googleUser: GoogleDto) {
    const { id, email, name, issuer } = googleUser;

    if (!googleUser) throw new ForbiddenException('No user from google');

    const credentials = await this.prisma.federatedCredential.findFirst({
      where: {
        provider: issuer,
        subject: id,
      },
    });

    if (!credentials) {
      const hash = await argon.hash(this.config.get('DEFAULT_PASSWORD'));

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          hash,
        },
      });

      await this.prisma.federatedCredential.create({
        data: {
          provider: issuer,
          subject: id,
          userId: user.id,
        },
      });

      // return user;
      return this.signToken(user.id, user.email, user.name);
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: credentials.userId,
      },
    });

    return this.signToken(user.id, user.email, user.name);
  }

  private async signToken(
    userId: number | string,
    email: string,
    name: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      name,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
