import { User } from '@prisma/client';
export declare class UserEntityMock implements Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'hash'> {
    email: string;
    name: string;
}
export declare const multipleUsers: UserEntityMock[];
