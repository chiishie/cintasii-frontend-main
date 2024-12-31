import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../../../lib/apiClient";

const useGetUsers = () => {
  const fetchUsers = async () => {
    const { data } = await apiClient.get("/api/users");
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { data, isLoading, isError };
};

export default useGetUsers;
