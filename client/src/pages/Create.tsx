import { useState } from "react";
import { useMutation } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BasicDetails, CalendarForm, Heading, View } from "../components";
import { CreateInputForm, SetFormProps } from "../components/types";
import { usePostAppointment } from "../hooks";
import { useAppSelector } from "../redux/hooks";

export default function Create() {
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.themeState.theme);

  const [createInfo, setCreateInfo] = useState<CreateInputForm>();
  const [form, setForm] = useState<SetFormProps["T"]>("basicDetails");

  const mutation = useMutation(usePostAppointment, {
    onSuccess: (data) => {
      console.log(data);

      toast.success("Appointment Created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: theme,
      });

      navigate("/");
    },
  });

  function handleSubmit() {
    if (typeof createInfo !== "undefined") {
      mutation.mutate({
        title: createInfo.title || "",
        start: createInfo.start || "",
        end: createInfo.end || "",
        allDay: createInfo.allDay || false,
        description: createInfo.description || "",
        guestId: createInfo.guestId || 0,
      });
    }
  }

  let step: JSX.Element;

  switch (form) {
    case "basicDetails":
      step = (
        <BasicDetails
          setCreateInfo={setCreateInfo}
          createInfo={createInfo}
          setForm={setForm}
        />
      );
      break;
    case "calendar":
      step = (
        <CalendarForm
          setCreateInfo={setCreateInfo}
          createInfo={createInfo}
          setForm={setForm}
        />
      );
      break;

    default:
      step = (
        <View
          isLoading={mutation.isLoading ? "pending" : "idle"}
          handleConfirm={handleSubmit}
          createInfo={createInfo}
          setForm={setForm}
        />
      );
      break;
  }

  return (
    <div className="flex flex-col items-center">
      <Heading>Create an Appointment</Heading>
      {step}
    </div>
  );
}
