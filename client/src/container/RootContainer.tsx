import { Outlet } from "react-router-dom";
import { NavBar } from "../components";
import { useAppSelector } from "../redux/hooks";

export default function RootContainer() {
  const accessToken = useAppSelector((state) => state.authState.accessToken);

  return (
    <div
      style={{
        maxWidth: "400px",
      }}
      className="mx-auto font-poppins text-gray-800"
    >
      {accessToken && <NavBar />}
      <Outlet />
    </div>
  );
}
