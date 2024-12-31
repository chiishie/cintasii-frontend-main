import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../../../lib/apiClient";

const useManageUser = () => {
  const queryClient = useQueryClient();

  const deleteUserReq = async (user_id: string) => {
    const { data } = await apiClient.delete(`/api/users/${user_id}`);
    return data;
  };

  const {
    isSuccess: userDeleteSuccess,
    isError: userDeleteError,
    mutate: deleteUser,
  } = useMutation({
    mutationFn: deleteUserReq,
    mutationKey: ["delete-user"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { userDeleteSuccess, userDeleteError, deleteUser };
};

export default useManageUser;
