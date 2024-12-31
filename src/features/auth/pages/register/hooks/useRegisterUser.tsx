import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../../../lib/apiClient";
import { RegisterFormData } from "../../../interfaces/registerFormData";

interface RegisterResponse {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  first_name: string;
  last_name: string;
}

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await apiClient.post<RegisterResponse>(
        "/api/auth/register",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
