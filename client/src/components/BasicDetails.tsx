import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { AutoCompleteInput, Button, Input, RichTextInput } from '../components';
import { CreateInputForm, SetFormProps } from './types';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

interface CreateProps {
  setCreateInfo: React.Dispatch<
    React.SetStateAction<CreateInputForm | undefined>
  >;
  setForm: React.Dispatch<React.SetStateAction<SetFormProps['T']>>;
  createInfo: CreateInputForm | undefined;
}

export default function Create({
  setCreateInfo,
  setForm,
  createInfo,
}: CreateProps) {
  const {
    handleSubmit,
    watch,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateInputForm>();

  const onSubtmit: SubmitHandler<CreateInputForm> = (data) => {
    setCreateInfo(data);
    setForm('calendar');
  };

  useEffect(() => {
    reset(createInfo);
  }, [createInfo]);

  return (
    <form onSubmit={handleSubmit(onSubtmit)}>
      <Input
        label="Title*"
        type="text"
        placeholder="Appointment Name"
        id="title"
        error={errors.title && errors.title.message}
        {...register('title', {
          required: true,
        })}
      />
      <AutoCompleteInput
        changeFunc={watch}
        label="Guest Email*"
        type="text"
        autoComplete="off"
        placeholder="Guest Email"
        id="guest"
        resetField={reset}
        error={errors.guest && errors.guest.message}
        {...register('guest', {
          required: true,
        })}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <RichTextInput
            label="Description"
            name="description"
            initialValue="<p>Describe your appointment</p>"
            onChange={onChange}
            value={value}
          />
        )}
      />
      <span>
        <Button type="submit">Next</Button>
      </span>
    </form>
  );
}
