import React, { forwardRef } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

function Input(
  { label, ...props }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div className="text-base font-medium flex align-middle">
      <input
        type="checkbox"
        className="h-4 w-4 mr-2"
        {...props}
        id={props.name}
        ref={ref}
      />
      <label htmlFor={props.name} className="text-xs">
        {label}
      </label>
    </div>
  );
}

export default forwardRef(Input);
