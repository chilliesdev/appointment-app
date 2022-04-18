import { useEffect } from "react";
import { useQuery } from "react-query";
import { useGetUser } from "../hooks";

export default function ProfilePic(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const getUser = useGetUser();

  const { data, isFetching, refetch, isLoading } = useQuery(
    "picture",
    async () => {
      const response = await getUser;
      const name = response.name;
      return name.replace(/ /g, "+");
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (typeof data === "undefined") refetch();
  }, [data]);

  return (
    <img
      {...props}
      className={`${props.className} h-9 w-9 border-2 border-black dark:border-white rounded-full`}
      alt="Profile"
      src={
        !isLoading
          ? `https://ui-avatars.com/api/?name=${data}&background=random&rounded=true`
          : ""
      }
    />
  );
}
