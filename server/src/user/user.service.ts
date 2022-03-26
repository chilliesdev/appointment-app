import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { editUser } from './dto/editUser.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async editUser(userId: number, dto: editUser) {
        
        let data: editUser = dto

        // If request contains password convert the has to a password
        if (dto.password){
            const hash = await argon.hash(dto.password);
            data.hash = hash;
        }

        delete data.password;
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data
        })

        // delete user.hash;

        return user;
    }
}
