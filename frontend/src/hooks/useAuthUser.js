import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // don't retry failed auth
  });

  return {
    isLoading: query.isLoading,
    authUser: query.data?.user,
  };
};

export default useAuthUser;
