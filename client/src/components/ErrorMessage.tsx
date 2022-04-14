import { BiErrorCircle } from "react-icons/bi";

export default function ErrorMessage({ children }: { children: string }) {
  return (
    <div className="text-sm text-red-500 flex justify-start items-center mt-1">
      <BiErrorCircle className="mr-1" /> {children}
    </div>
  );
}
