import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchSignUp } from "../../hooks/useFetchFromServer";
import { useAppSelector } from "../../redux/hooks";
import { SignupInput } from "../types";

export default function Signup() {
  const dispatch = useDispatch();
  const serverErrorMessage = useAppSelector((state) => state.authState.message);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupInput>();
  const onSubmit: SubmitHandler<SignupInput> = (data) =>
    dispatch(fetchSignUp(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
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
        />
        {errors.email && (
          <div style={{ color: "red" }}>{errors.email.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="name">Full Name</label>
        <input
          {...register("name", { required: true, maxLength: 50 })}
          id="name"
          type="text"
          placeholder="Firstname Lastname"
        />
        {errors.name && (
          <div style={{ color: "red" }}>{errors.name.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          {...register("password", { required: true })}
          id="password"
          type="password"
          name="password"
          placeholder="Your Password"
        />
        {errors.password && (
          <div style={{ color: "red" }}>{errors.password.message}</div>
        )}
      </div>
      {serverErrorMessage && (
        <div style={{ color: "red" }}>{serverErrorMessage}</div>
      )}
      <button type="submit">Sign Up</button>
    </form>
  );
}
