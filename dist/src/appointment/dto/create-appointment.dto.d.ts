export default class CreateAppointmentDto {
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    description?: string;
    guestId: number;
}
