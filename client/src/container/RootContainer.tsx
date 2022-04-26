import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NavBar } from "../components";
import { useAppSelector } from "../redux/hooks";

export default function RootContainer() {
  const accessToken = useAppSelector((state) => state.authState.accessToken);

  return (
    <div
      style={{
        maxWidth: "400px",
      }}
      className="mx-auto"
    >
      {accessToken && <NavBar />}
      <ToastContainer />
      <Outlet />
    </div>
  );
}
