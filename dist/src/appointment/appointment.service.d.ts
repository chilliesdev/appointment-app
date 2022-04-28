import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Appointment, User } from '@prisma/client';
import PrismaService from '../prisma/prisma.service';
import CreateAppointmentDto from './dto/create-appointment.dto';
import EditAppointmentDto from './dto/edit-appointment.dto';
export declare class AppointmentService {
    private prisma;
    private schedulerRegistry;
    private mailerService;
    private config;
    constructor(prisma: PrismaService, schedulerRegistry: SchedulerRegistry, mailerService: MailerService, config: ConfigService);
    private readonly logger;
    getAppointment(userId: number): import(".prisma/client").PrismaPromise<Appointment[]>;
    getAppointmentById(userId: number, appointmentId: number): import(".prisma/client").Prisma.Prisma__AppointmentClient<Appointment>;
    createAppointment(user: User, dto: CreateAppointmentDto): Promise<Appointment & {
        host: User;
        guest: User;
    }>;
    editAppointment(userId: number, appointmentId: number, dto: EditAppointmentDto): Promise<Appointment>;
    deleteAppointment(userId: number, appointmentId: number): Promise<Appointment>;
    addCronJob(name: string, date: Date, callback: () => Promise<void>): void;
    sendReminderMail(user: User, appointment: Appointment): Promise<void>;
}
