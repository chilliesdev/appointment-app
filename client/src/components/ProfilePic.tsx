import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

export default function ProfilePic(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const user = useAppSelector((state) => state.authState.user);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(user ? user?.name.replace(/ /g, "+") : "");
  }, [user]);

  return (
    <img
      {...props}
      className={`${props.className} h-9 w-9 border-2 border-black dark:border-white rounded-full`}
      alt="Profile"
      src={
        user
          ? `https://ui-avatars.com/api/?name=${fullName}&background=random&rounded=true`
          : ""
      }
    />
  );
}
