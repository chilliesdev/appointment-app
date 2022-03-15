import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('signup')
    signup(@Body() dto: SignupDto){
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body()dto: SigninDto){
        return this.authService.signin(dto);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth(@Req() req) {}

    @Get('/google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req){
        return this.authService.googleSigin(req);
    }
}
