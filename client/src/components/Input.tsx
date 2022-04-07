import React from "react";
import ErrorMessage from "./ErrorMessage";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string | undefined;
  labelAfter?: boolean;
}

export default function Input({
  label,
  name,
  error,
  labelAfter,
  ...props
}: InputProps) {
  return (
    <div>
      {!labelAfter && <label htmlFor={name}>{label}</label>}
      <input {...props} />
      {labelAfter && <label htmlFor={name}>{label}</label>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
