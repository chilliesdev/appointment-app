import { Link } from "react-router-dom";

export default function Logo({ full }: { full?: boolean }) {
  return (
    <Link to="/" className={`${!full && "my-6"} flex items-center`}>
      <img
        className="h-10 w-10"
        alt="Logo"
        src={require("../images/logo.svg").default}
      />
      {full && (
        <span className="text-black dark:text-white text-xs font-bold">
          Appointment
        </span>
      )}
    </Link>
  );
}
