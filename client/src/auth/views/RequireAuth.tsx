import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useGetUser } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, setUserData } from "../authSlice";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const accessToken = useAppSelector((state) => state.authState.accessToken);
  const dispatch = useAppDispatch();

  const getUser = useGetUser;

  useEffect(() => {
    getUser()
      .then((response) => {
        dispatch(setUserData(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout());
      });
  }, [accessToken]);

  if (!accessToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
