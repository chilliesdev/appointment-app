import { Appointment } from '@prisma/client';
declare class AppointmentEntityMock implements Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'guestId' | 'hostId'> {
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    description: string;
}
export declare const multipleAppointments: AppointmentEntityMock[];
export {};
