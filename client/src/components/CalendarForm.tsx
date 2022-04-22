import { CreateInputForm, SetFormProps } from "./types";

export default function CalendarForm({
  setCreateInfo,
  setForm,
}: {
  setCreateInfo: (info: CreateInputForm) => void;
  setForm: (formType: SetFormProps["T"]) => void;
}) {
  return <div>Calendar</div>;
}
