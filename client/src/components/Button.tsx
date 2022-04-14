import { Oval } from "react-loader-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  loading?: "idle" | "pending" | "succeeded" | "failed";
}

export default function Button({ children, loading, ...props }: ButtonProps) {
  return (
    <button
      disabled={loading === "pending" ? true : false}
      style={{
        width: "358px",
        height: "46px",
      }}
      className="my-6 bg-primary capitalize text-white rounded-md flex justify-center items-center disabled:opacity-75 disabled:cursor-wait"
      {...props}
    >
      {loading === "pending" ? (
        <Oval color="white" height={16} width={16} />
      ) : (
        children
      )}
    </button>
  );
}
