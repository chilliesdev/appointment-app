import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/strategy/google.strategy';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    AuthModule, 
    PrismaModule, AppointmentModule
  ],
  controllers: [UserController],
  providers: [UserService, GoogleStrategy]
})
export class AppModule {}
