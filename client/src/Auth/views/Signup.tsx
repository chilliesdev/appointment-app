import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, ErrorMessage, Input } from "../../components";
import { fetchSignUp } from "../../hooks/useFetchFromServer";
import { useAppSelector } from "../../redux/hooks";
import { SignupInput } from "../types";

type LocationState = {
  from: {
    pathname: string;
  };
};

export default function Signup() {
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
  } = useForm<SignupInput>();
  const onSubmit: SubmitHandler<SignupInput> = (data) => {
    dispatch(fetchSignUp(data));

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
        label="Full Name"
        {...register("name", { required: true, maxLength: 50 })}
        id="name"
        type="text"
        placeholder="Firstname Lastname"
        error={errors.name && errors.name.message}
      />
      <Input
        label="Password"
        {...register("password", { required: true })}
        id="password"
        type="password"
        placeholder="Your Password"
        error={errors.password && errors.password.message}
      />
      {serverErrorMessage && <ErrorMessage>{serverErrorMessage}</ErrorMessage>}
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
