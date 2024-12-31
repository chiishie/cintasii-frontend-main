import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../../lib/apiClient";
import { UserRoleAssign } from "../../interfaces/payloads/user-role-assignment";

const useUnassignRole = () => {
  const queryClient = useQueryClient();

  const unassignRole = async (payload: UserRoleAssign) => {
    const { data } = await apiClient.post<{
      message: string;
    }>("/api/roles/unassign", {
      role_id: payload.role_id,
      user_id: payload.user_id,
    });

    return data;
  };

  const { isSuccess, isError, data, mutate } = useMutation({
    mutationFn: unassignRole,
    mutationKey: ["unassign-role"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", 1] });
      queryClient.invalidateQueries({ queryKey: ["users", 2] });
    },
  });

  return { isSuccess, isError, data, unassignRole: mutate };
};

export default useUnassignRole;
