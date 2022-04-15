import Logo from "./Logo";
import NavOptions from "./NavOptions";
import { ToogleTheme } from "../theme/views";

export default function NavBar() {
  return (
    <div className="flex justify-between">
      <Logo full />
      <span className="flex">
        <ToogleTheme />
        <NavOptions />
      </span>
    </div>
  );
}
