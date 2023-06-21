import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useGetUser } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, setUserData } from '../authSlice';
import { LoadingScreen } from '../../components';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const accessToken = useAppSelector((state) => state.authState.accessToken);
  const dispatch = useAppDispatch();

  const getUser = useGetUser;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((response) => {
        setLoading(false);
        dispatch(setUserData(response));
      })
      .catch(() => {
        setLoading(false);
        dispatch(logout());
      });
  }, [accessToken, dispatch, getUser]);

  if (!accessToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return loading ? <LoadingScreen /> : children;
}
