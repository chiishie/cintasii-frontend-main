import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../../../lib/apiClient";
import { UserRoleAssign } from "../../../interfaces/payloads/user-role-assignment";

const useSetUserRoles = () => {
  const queryClient = useQueryClient();

  const assignRole = async (payload: UserRoleAssign) => {
    const { data } = await apiClient.post<{
      message: string;
    }>("/api/roles/assign", {
      role_id: payload.role_id,
      user_id: payload.user_id,
    });

    return data;
  };

  const { isSuccess, isError, data, mutate } = useMutation({
    mutationFn: assignRole,
    mutationKey: ["assign-role"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", 1] });
      queryClient.invalidateQueries({ queryKey: ["users", 2] });
    },
  });

  return { isSuccess, isError, data, assignRole: mutate };
};

export default useSetUserRoles;
