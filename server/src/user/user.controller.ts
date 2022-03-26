import { Body, Controller, Get, Headers, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { editUser } from './dto/editUser.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    getUser(@GetUser() user: User){
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: editUser
    ){
        return this.userService.editUser(userId, dto);
    }
}
