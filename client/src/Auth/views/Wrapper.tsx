import { Link } from "react-router-dom";
import { Logo } from "../../components";

export default function Wrapper({
  children,
  type,
}: {
  children: JSX.Element;
  type: "signin" | "signup";
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Logo />
      <h2 className="font-bold text-3xl mb-4">
        {type === "signin" ? "Sign in to your account" : "Join our community"}
      </h2>
      <p className="text-gray-500 dark:text-gray-100 font-medium text-lg mb-6">
        {type === "signin"
          ? "Start your demo version"
          : "Start your journey with our product"}
      </p>
      {children}
      <p className="text-xs w-max m-auto pb-4">
        {type === "signin"
          ? "Don’t have an account?"
          : "Already have an account?"}
        <Link
          className="hover:underline text-primary pl-1"
          to={`/${type === "signin" ? "signup" : "signin"}`}
        >
          {type === "signin" ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  );
}
