import { useDispatch } from "react-redux";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { useAppSelector } from "../redux/hooks";

export default function RootContainer() {
  const dispatch = useDispatch();
  const accessToken = useAppSelector((state) => state.authState.accessToken);
  let navigate = useNavigate();

  const logoutCurrentUser = () => {
    navigate("/signin");
    dispatch(logout());
  };

  return (
    <div
      style={{
        maxWidth: "400px",
      }}
      className="m-auto"
    >
      {accessToken && <button onClick={logoutCurrentUser}>Sign Out</button>}
      <Outlet />
    </div>
  );
}
