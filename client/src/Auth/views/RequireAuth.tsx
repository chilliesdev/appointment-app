import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const accessToken = useAppSelector((state) => state.authState.accessToken);

  if (!accessToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
