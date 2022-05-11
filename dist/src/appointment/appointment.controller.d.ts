import { User } from '@prisma/client';
import { AppointmentService } from './appointment.service';
import CreateAppointmentDto from './dto/create-appointment.dto';
import EditAppointmentDto from './dto/edit-appointment.dto';
export declare class AppointmentController {
    private appointmentService;
    constructor(appointmentService: AppointmentService);
    getAppointment(userId: number): import(".prisma/client").PrismaPromise<import(".prisma/client").Appointment[]>;
    getAppointmentById(userId: number, appointmentId: number): import(".prisma/client").Prisma.Prisma__AppointmentClient<import(".prisma/client").Appointment>;
    createAppointment(user: User, dto: CreateAppointmentDto): Promise<import(".prisma/client").Appointment & {
        host: User;
        guest: User;
    }>;
    editAppointment(userId: number, appointmentId: number, dto: EditAppointmentDto): Promise<import(".prisma/client").Appointment>;
    deleteAppointment(userId: number, appointmentId: number): Promise<import(".prisma/client").Appointment>;
}
