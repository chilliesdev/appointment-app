import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { GoogleDto } from './dto/google.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  // Google Auth
  @Post('google')
  // @UseGuards(AuthGuard('google'))
  googleAuth(@Body() dto: GoogleDto) {
    return this.authService.googleSigin(dto);
  }
}
