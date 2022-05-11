import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../authSlice";

export default function Signout() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutCurrentUser = () => {
    navigate("/signin");
    dispatch(logout());
  };

  useEffect(() => {
    logoutCurrentUser();
  }, []);

  return <></>;
}
