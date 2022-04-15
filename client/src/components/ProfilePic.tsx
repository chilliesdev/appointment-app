import { useQuery } from "react-query";
import { useGetUser } from "../hooks";

export default function ProfilePic() {
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
    <>
      {!isLoading ? (
        <img
          src={`https://ui-avatars.com/api/?name=${data}&background=random&rounded=true `}
        />
      ) : (
        <img alt="Profile Picture" />
      )}
    </>
  );
}
