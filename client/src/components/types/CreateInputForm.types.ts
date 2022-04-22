export interface CreateInputForm {
  date?: string;
  duration?: number;
  name?: string;
  description?: string;
  guest?: string;
}

export interface SetFormProps {
  T: "basicDetails" | "calendar";
}
