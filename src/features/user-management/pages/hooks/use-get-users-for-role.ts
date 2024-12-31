import { useQuery } from "@tanstack/react-query";
import { User } from "@/features/user-management/interfaces/responses/user";
import apiClient from "@/lib/apiClient";

const useGetUsersForRole = (roleId: number) => {
  const fetchUsersForRole = async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>(`/api/roles/${roleId}/users`);
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", roleId],
    queryFn: fetchUsersForRole,
  });

  return { data, isLoading, isError };
};

export default useGetUsersForRole;
