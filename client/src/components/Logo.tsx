import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img
        className="h-10 w-10 my-6"
        alt="Logo"
        src={require("../images/logo.svg").default}
      />
    </Link>
  );
}
