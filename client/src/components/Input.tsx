import React, { forwardRef } from "react";
import ErrorMessage from "./ErrorMessage";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: string | undefined;
}

function Input(
  { label, error, ...props }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div className="text-base font-medium mb-6">
      <label htmlFor={props.name} className="block my-1">
        {label}
      </label>
      <input
        style={{
          width: "358px",
          height: "46px",
        }}
        className="px-3 py-2 border rounded-lg border-gray-200 text-gray-900"
        {...props}
        ref={ref}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default forwardRef(Input);
