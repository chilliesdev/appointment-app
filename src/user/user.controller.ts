import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import GetUser from '../auth/decorator/get-user.decorator';
import JwtGuard from '../auth/guard/jwt.guard';
import editUser from './dto/editUser.dto';
import ParseStringPipe from './pipes/parse-string.pipe';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: editUser) {
    return this.userService.editUser(userId, dto);
  }

  @Get('filter')
  filterUser(
    @Query('email', ParseStringPipe) email: string | undefined,
    @Query('name', ParseStringPipe) name: string | undefined,
  ) {
    return this.userService.filterUser(email, name);
  }
}
