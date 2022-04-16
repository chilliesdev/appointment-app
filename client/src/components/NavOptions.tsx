import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";

interface NavLinkProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  to: string;
  children: string;
}

function NavLink({ children, to, className, ...props }: NavLinkProps) {
  return (
    <li className={` ${className}`} {...props}>
      <Link
        to={to}
        className="block w-28 h-7 p-1 m-1 rounded-sm hover:bg-secondary dark:hover:bg-gray-500 text-base"
      >
        {children}
      </Link>
    </li>
  );
}

export default function NavOptions() {
  const [links, setLinks] = useState(false);

  return (
    <div
      onMouseEnter={() => setLinks(false)}
      onMouseLeave={() => setLinks(true)}
    >
      <ProfilePic onClick={() => setLinks(!links)} />
      <ol
        className={`${
          links ? "opacity-0" : "opacity-100"
        } absolute top-10 transition-all border shadow-sm py-4 px-1 rounded-md`}
        style={{ right: "calc((100vw - 400px)/2)" }}
      >
        <NavLink className="border-b" to="/">
          Home
        </NavLink>
        <NavLink to="/">Profile</NavLink>
        <NavLink to="/signout">Sign Out</NavLink>
      </ol>
    </div>
  );
}
