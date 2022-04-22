import { Oval } from "react-loader-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  loading?: "idle" | "pending" | "succeeded" | "failed";
  transparent?: boolean;
}

export default function Button({
  children,
  loading,
  transparent,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading === "pending" ? true : false}
      style={{
        width: "358px",
        height: "46px",
      }}
      className={`my-6 ${
        transparent
          ? "bg-white text-gray-800 border-gray-800 border-2 dark:bg-gray-800 dark:text-white dark:border-white"
          : "bg-primary text-white"
      } capitalize rounded-md flex justify-center items-center disabled:opacity-75 disabled:cursor-wait`}
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
