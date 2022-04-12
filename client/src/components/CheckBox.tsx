import React, { forwardRef } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

function Input(
  { label, ...rest }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div className="text-base font-medium flex align-middle">
      <input type="checkbox" className="h-4 w-4 mr-2" {...rest} ref={ref} />
      <label className="text-xs">{label}</label>
    </div>
  );
}

export default forwardRef(Input);
