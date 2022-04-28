import { SubHeading } from ".";
import Button from "./Button";
import Heading from "./Heading";
import Text from "./Text";
import { CreateInputForm, SetFormProps } from "./types";

interface ViewProps {
  isLoading: "idle" | "pending";
  setForm: React.Dispatch<React.SetStateAction<SetFormProps["T"]>>;
  createInfo: CreateInputForm | undefined;
  handleConfirm: () => void;
}

export default function View({
  isLoading,
  createInfo,
  setForm,
  handleConfirm,
}: ViewProps) {
  const start = createInfo?.start ? createInfo?.start : "";
  const end = createInfo?.end ? createInfo?.end : "";

  const duration = (start: string, end: string): number => {
    const difference = new Date(end).valueOf() - new Date(start).valueOf();
    const minutes = Math.round(difference / 60000);
    return minutes;
  };

  return (
    <div className="flex flex-col items-center">
      <Button transparent onClick={() => setForm("calendar")}>
        Go Back
      </Button>
      <Heading>Confirm Details</Heading>
      <div className="w-full">
        <SubHeading>Title</SubHeading>
        <Text>{createInfo?.title}</Text>
        <SubHeading>Date</SubHeading>
        <Text>{new Date(start).toLocaleDateString()}</Text>
        <SubHeading>Time</SubHeading>
        <Text>{`${new Date(start).toLocaleTimeString()}`}</Text>
        <SubHeading>Duration</SubHeading>
        <Text>
          {createInfo?.allDay
            ? "All day appointment"
            : `${duration(start, end)} minutes`}
        </Text>
        <SubHeading>Description</SubHeading>
        <div
          className="text-xs rounded bg-slate-100 dark:bg-gray-900 p-2"
          dangerouslySetInnerHTML={{
            __html: createInfo?.description ? createInfo.description : "",
          }}
        ></div>
      </div>
      <Button loading={isLoading} onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  );
}
