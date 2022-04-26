import Button from "./Button";
import { CreateInputForm, SetFormProps } from "./types";

interface ConfirmCompleteProps {
  setCreateInfo: React.Dispatch<
    React.SetStateAction<CreateInputForm | undefined>
  >;
  setForm: React.Dispatch<React.SetStateAction<SetFormProps["T"]>>;
  createInfo: CreateInputForm | undefined;
  handleConfirm: () => void;
}

export default function ConfirmComplete({
  setCreateInfo,
  createInfo,
  setForm,
  handleConfirm,
}: ConfirmCompleteProps) {
  return (
    <div className="absolute h-screen bg-black/50 w-screen z-20 flex flex-col items-center justify-center">
      <div className="h-fit w-fit bg-white rounded shadow-sm shadow-white">
        <div className="text-black">
          <h5>{createInfo?.title}</h5>
          <b>{`${createInfo?.start} - ${createInfo?.end}`}</b>
          <div>{createInfo?.description}</div>
        </div>
        <div className="flex">
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button transparent onClick={() => setForm("calendar")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
