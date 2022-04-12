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
  { label, error, ...rest }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div className="text-base font-medium mb-6">
      <label className="block my-1">{label}</label>
      <input
        style={{
          width: "358px",
          height: "46px",
        }}
        className="px-3 py-2 border rounded-lg border-gray-200"
        {...rest}
        ref={ref}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default forwardRef(Input);
