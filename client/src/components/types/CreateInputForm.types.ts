export interface CreateInputForm {
  title?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  description?: string;
  guest?: string;
  guestId?: number;
}

export interface SetFormProps {
  T: "basicDetails" | "calendar" | "complete";
}
