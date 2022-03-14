import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    @Get()
    getUser(@GetUser() user: User){
        return user;
    }
}
