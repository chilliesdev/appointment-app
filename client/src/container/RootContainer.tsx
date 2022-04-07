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
    <>
      <ul>
        <li>
          <Link to="/">Protected Page</Link>
        </li>
      </ul>
      {!accessToken ? (
        <>
          <p>Please Login</p>
          <Outlet />
        </>
      ) : (
        <>
          <p>
            Welcome
            <button onClick={logoutCurrentUser}>Sign Out</button>
          </p>
          <Outlet />
        </>
      )}
    </>
  );
}
