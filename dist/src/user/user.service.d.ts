import PrismaService from '../prisma/prisma.service';
import editUser from './dto/editUser.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editUser(userId: number, dto: editUser): Promise<import(".prisma/client").User>;
    filterUser(email: string, name: string): Promise<{
        id: number;
        email: string;
        name: string;
    }[]>;
}
