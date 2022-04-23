import { PrismaClient, User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from '../src/prisma/prisma.service';
import { multipleAppointments } from './entities/appointment.entity';
import { multipleUsers } from './entities/user.entity';
import { Faker } from 'mockingbird';

const prisma = new PrismaClient();

function returnRandomDate() {
  return Faker.date.between(
    '2022-04-23T00:00:00.000Z',
    '2022-04-30T00:00:00.000Z',
  );
}

async function main() {
  const hash = await argon.hash('password');

  // clean DB
  await prisma.$transaction([
    prisma.user.deleteMany({}),
    prisma.appointment.deleteMany({}),
  ]);

  const users = multipleUsers.map((data) => {
    return {
      ...data,
      hash,
    };
  });

  await prisma.user.createMany({
    data: users,
  });

  const allUsers = await prisma.user.findMany();

  const appointments = multipleAppointments.map((data) => {
    const randomGuest = allUsers[Math.floor(Math.random() * allUsers.length)];
    const randomHost = allUsers[Math.floor(Math.random() * allUsers.length)];

    const date = returnRandomDate();

    return {
      ...data,
      guestId: randomGuest.id,
      hostId: randomHost.id,
      start: date,
      end: new Date(date.getTime() + 30 * 60000),
    };
  });

  await prisma.appointment.createMany({
    data: appointments,
  });
}

main();
