import Logo from "./Logo";
import NavOptions from "./NavOptions";
import { ToogleTheme } from "../theme/views";

export default function NavBar() {
  return (
    <header className="flex justify-between shadow-sm dark:shadow-gray-600">
      <Logo full />
      <span className="flex items-center mr-1">
        <ToogleTheme />
        <NavOptions />
      </span>
    </header>
  );
}
