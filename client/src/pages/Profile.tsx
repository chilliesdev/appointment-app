import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { SignupInput } from "../auth/types";
import { Button, Heading, Input, ProfilePic } from "../components";
import { useEditUser } from "../hooks";
import { useAppSelector } from "../redux/hooks";

export default function Profile() {
  const theme = useAppSelector((state) => state.themeState.theme);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ProfileInput>();
  const user = useAppSelector((state) => state.authState.user);

  useEffect(() => {
    if (typeof user !== "undefined") reset(user);
  }, [user]);

  const mutation = useMutation(useEditUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("userInfo");
      toast.success("Edited Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: theme,
      });
    },
  });

  type ProfileInput = Omit<SignupInput, "rememberMe">;

  const onSubmit: SubmitHandler<ProfileInput> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <Heading>Edit Your Profile</Heading>
      <ProfilePic className="h-14 w-14" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Your Email"
          {...register("email", {
            maxLength: 50,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email && errors.email.message}
        />
        <Input
          // disabled={loading === "pending" ? true : false}
          label="Full Name"
          {...register("name", { maxLength: 50 })}
          id="name"
          type="text"
          placeholder="Firstname Lastname"
          error={errors.name && errors.name.message}
        />
        <Input
          // disabled={loading === "pending" ? true : false}
          label="Password"
          {...register("password")}
          id="password"
          type="password"
          placeholder="Your Password"
          error={errors.password && errors.password.message}
        />
        <Button loading={mutation.isLoading ? "pending" : "idle"} type="submit">
          Edit Profile
        </Button>
      </form>
    </div>
  );
}
