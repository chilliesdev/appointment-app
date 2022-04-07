import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, ErrorMessage, Input } from "../../components";
import { fetchSignIn } from "../../hooks/useFetchFromServer";
import { useAppSelector } from "../../redux/hooks";
import { SigninInput } from "../types";

type LocationState = {
  from: {
    pathname: string;
  };
};

export default function Signin() {
  const dispatch = useDispatch();
  const serverErrorMessage = useAppSelector((state) => state.authState.message);
  const accessToken = useAppSelector((state) => state.authState.accessToken);

  let navigate = useNavigate();
  let location = useLocation();

  const customState = location.state as LocationState;

  useEffect(() => {
    // Check if logged In
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninInput>();
  const onSubmit: SubmitHandler<SigninInput> = async (data) => {
    await dispatch(fetchSignIn(data));

    // Send them back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    if (customState) {
      let fromState = customState.from?.pathname || "/";
      navigate(fromState, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        {...register("email", {
          required: true,
          maxLength: 50,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
          },
        })}
        id="email"
        type="email"
        placeholder="Your Email"
        error={errors.email && errors.email.message}
      />
      <Input
        label="Password"
        {...register("password", { required: true })}
        id="password"
        type="password"
        placeholder="Your Password"
        error={errors.password && errors.password.message}
      />
      <Input
        label="Remember Me"
        type="checkbox"
        labelAfter
        {...register("rememberMe")}
      />

      {serverErrorMessage && <ErrorMessage>{serverErrorMessage}</ErrorMessage>}
      <Button type="submit">Sign In</Button>
    </form>
  );
}
