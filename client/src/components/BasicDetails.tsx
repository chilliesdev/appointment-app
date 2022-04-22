import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AutoCompleteInput, Button, Input, RichTextInput } from "../components";
import { SetFormProps } from "./types";

interface CreateInputForm {
  // date: string;
  // duration: number;
  name: string;
  description: string;
  guest: string;
}

export default function Create({
  setCreateInfo,
  setForm,
}: {
  setCreateInfo: (info: CreateInputForm) => void;
  setForm: (formType: SetFormProps["T"]) => void;
}) {
  const {
    handleSubmit,
    watch,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateInputForm>();

  // const watchGuest = watch("guest");

  const onSubtmit: SubmitHandler<CreateInputForm> = (data) => {
    setCreateInfo(data);
    setForm("calendar");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubtmit)}>
      <Input
        label="Name*"
        type="text"
        placeholder="Appointment Name"
        id="name"
        error={errors.name && errors.name.message}
        {...register("name", {
          required: true,
        })}
      />
      <AutoCompleteInput
        changeFunc={watch}
        label="Guest Email*"
        type="text"
        placeholder="Guest Email"
        id="guest"
        resetField={reset}
        // watchedFieldData={watchGuest.guest}
        error={errors.guest && errors.guest.message}
        {...register("guest", {
          required: true,
        })}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, ref } }) => (
          <RichTextInput
            label="Description"
            name="description"
            initialValue="<p>Add appointment descript</p>"
            onChange={onChange}
            value={value}
            ref={ref}
          />
        )}
      />
      <span>
        <Button type="submit">Next</Button>
      </span>
    </form>
  );
}
