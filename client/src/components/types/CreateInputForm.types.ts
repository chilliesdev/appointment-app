export interface CreateInputForm {
  title?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  description?: any;
  guest?: string;
  guestId?: number;
}

export interface SetFormProps {
  T: 'basicDetails' | 'calendar' | 'complete';
}
