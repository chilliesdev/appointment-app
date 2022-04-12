interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      style={{
        width: "358px",
        height: "46px",
      }}
      className="my-6 bg-primary capitalize text-white rounded-md"
      {...props}
    >
      {children}
    </button>
  );
}
