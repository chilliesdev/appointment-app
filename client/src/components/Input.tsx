import React, { forwardRef } from "react";
import ErrorMessage from "./ErrorMessage";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  // name: string;
  error?: string | undefined;
  labelAfter?: boolean;
}

// const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
//   const { label, name, error, labelAfter, ...rest } = props;

//   return (
//     <div>
//       {!labelAfter && <label htmlFor={name}>{label}</label>}
//       <input {...rest} ref={ref} />
//       {labelAfter && <label htmlFor={name}>{label}</label>}
//       {error && <ErrorMessage>{error}</ErrorMessage>}
//     </div>
//   );
// });

// export default Input;

function Input(
  { label, error, labelAfter, ...rest }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div>
      {!labelAfter && <label>{label}</label>}
      <input {...rest} ref={ref} />
      {labelAfter && <label>{label}</label>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default forwardRef(Input);
