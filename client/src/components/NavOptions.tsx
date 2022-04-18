import { useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import useComponentVisible from "../hooks/useComponentVisible";
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

  const { ref, isComponentVisible } = useComponentVisible(false);

  return (
    <div ref={ref}>
      <span
        className="flex items-center"
        // onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <ProfilePic onClick={() => setLinks(!links)} />
        <BsChevronDown className="ml-0.5" />
      </span>
      {isComponentVisible && (
        <ol
          className="absolute top-10 transition-all bg-white dark:bg-gray-900 border shadow-sm py-4 px-1 rounded-md z-10"
          style={{ right: "calc((100vw - 400px)/2)" }}
        >
          <NavLink className="border-b" to="/">
            Home
          </NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/signout">Sign Out</NavLink>
        </ol>
      )}
    </div>
  );
}
