export interface UserTypes {
  email?: string;
  name?: string;
  password?: string;
}

export interface AppointmentTypes {
  id?: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  description?: string;
  guestId: number;
}
