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
    { enabled: false }
  );

  if (!isFetching && !data) refetch();

  return (
    <img
      {...props}
      className="h-9 w-9 border-2 border-black rounded-full"
      alt="Profile Picture"
      src={
        !isLoading
          ? `https://ui-avatars.com/api/?name=${data}&background=22C55E&rounded=true`
          : ""
      }
    />
  );
}
