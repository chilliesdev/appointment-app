export default function GoogleButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      style={{
        width: "358px",
        height: "46px",
      }}
      className="bg-white rounded-md border-gray-100 border flex justify-center items-center mb-6"
      {...props}
    >
      <img
        className="h-6 w-6 mx-2"
        alt="Google Logo"
        src={require("../images/google-logo.svg").default}
      />
      Sign in with Google
    </button>
  );
}
