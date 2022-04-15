import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuth } from ".";
import { Button, CheckBox, ErrorMessage, Input } from "../../components";
import { fetchSignIn } from "../../hooks";
import { useAppSelector } from "../../redux/hooks";
import { SigninInput } from "../types";
import Wrapper from "./Wrapper";

type LocationState = {
  from: {
    pathname: string;
  };
};

export default function Signin() {
  const dispatch = useDispatch();
  const serverErrorMessage = useAppSelector((state) => state.authState.message);
  const accessToken = useAppSelector((state) => state.authState.accessToken);
  const loading = useAppSelector((state) => state.authState.loading);

  let navigate = useNavigate();
  let location = useLocation();

  const customState = location.state as LocationState;

  useEffect(() => {
    // Check if logged In
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);

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
    <Wrapper type="signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={loading === "pending" ? true : false}
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
        {errors.email && (
          <div style={{ color: "red" }}>{errors.email.message}</div>
        )}
        <Input
          disabled={loading === "pending" ? true : false}
          label="Password"
          {...register("password", { required: true })}
          id="password"
          type="password"
          placeholder="Your Password"
          error={errors.password && errors.password.message}
        />
        <div className="flex justify-between">
          <CheckBox
            disabled={loading === "pending" ? true : false}
            label="Remember Me"
            type="checkbox"
            {...register("rememberMe")}
          />
          <Link className="text-xs hover:underline text-primary" to="/">
            Forgot Password?
          </Link>
        </div>

        {serverErrorMessage && (
          <ErrorMessage>{serverErrorMessage}</ErrorMessage>
        )}
        <Button loading={loading} type="submit">
          Sign In
        </Button>
        <GoogleAuth />
      </form>
    </Wrapper>
  );
}
