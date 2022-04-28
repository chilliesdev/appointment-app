import { User } from '@prisma/client';
import editUser from './dto/editUser.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(user: User): User;
    editUser(userId: number, dto: editUser): Promise<User>;
    filterUser(email: string | undefined, name: string | undefined): Promise<{
        id: number;
        email: string;
        name: string;
    }[]>;
}
