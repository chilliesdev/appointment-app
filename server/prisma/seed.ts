import { PrismaClient, User } from '@prisma/client';
import * as argon from 'argon2';
import { multipleAppointments } from './entities/appointment.entity';
import { multipleUsers } from './entities/user.entity';

const prisma = new PrismaClient();

async function main() {
  const hash = await argon.hash('password');

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

    return {
      ...data,
      guestId: randomGuest.id,
      hostId: randomHost.id,
    };
  });

  await prisma.appointment.createMany({
    data: appointments,
  });
}

main();
