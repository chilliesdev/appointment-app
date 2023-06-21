import { FormEventHandler } from 'react';

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

const Form = ({ onSubmit, children }: FormProps) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
