import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { editUser } from './dto/editUser.dto';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    @Get()
    getUser(@GetUser() user: User){
        return user;
    }

    @Patch()
    editUser(dto: editUser){
        return "edit user";
    }
}
