"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon = require("argon2");
const appointment_entity_1 = require("./entities/appointment.entity");
const user_entity_1 = require("./entities/user.entity");
const mockingbird_1 = require("mockingbird");
const prisma = new client_1.PrismaClient();
function returnRandomDate() {
    const date = new Date();
    const nextSevenDays = new Date(date.setDate(date.getDate() + 7));
    const today = new Date(Date.now());
    return mockingbird_1.Faker.date.between(today.toISOString(), nextSevenDays.toISOString());
}
async function main() {
    const hash = await argon.hash('password');
    await prisma.$transaction([
        prisma.user.deleteMany({}),
        prisma.appointment.deleteMany({}),
    ]);
    const users = user_entity_1.multipleUsers.map((data) => {
        return Object.assign(Object.assign({}, data), { hash });
    });
    await prisma.user.createMany({
        data: users,
    });
    const allUsers = await prisma.user.findMany();
    const appointments = appointment_entity_1.multipleAppointments.map((data) => {
        const randomGuest = allUsers[Math.floor(Math.random() * allUsers.length)];
        const randomHost = allUsers[Math.floor(Math.random() * allUsers.length)];
        const date = returnRandomDate();
        return Object.assign(Object.assign({}, data), { guestId: randomGuest.id, hostId: randomHost.id, start: date, end: new Date(date.getTime() + 30 * 60000) });
    });
    await prisma.appointment.createMany({
        data: appointments,
    });
}
main();
//# sourceMappingURL=seed.js.map