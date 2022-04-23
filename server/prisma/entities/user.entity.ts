import { Mock, MockFactory } from 'mockingbird';
import { User } from '@prisma/client';

export class UserEntityMock
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'hash'>
{
  @Mock((faker) => faker.internet.email())
  email!: string;

  @Mock((faker) => `${faker.name.firstName()} ${faker.name.lastName()}`)
  name!: string;
}

export const multipleUsers = MockFactory(UserEntityMock).many(10);
