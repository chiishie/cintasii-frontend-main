import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../../../lib/apiClient";
import { LoginFormData } from "../../../interfaces/loginFormData";
import { useNavigate } from "react-router-dom";
import { UserResponse } from "../../../interfaces/response/userResponse";
import { RoleResponse } from "../../../interfaces/response/roleResponse";
import { useAppDispatch } from "../../../../../redux/hooks/useAppDispatch";
import { login } from "../../../../../redux/slices/auth-slice";
import { useToast } from "../../../../../hooks/use-toast";
import { AxiosError } from "axios";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await apiClient.post<LoginResponse>(
        "/api/auth/jwt/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: async (data) => {
      const headers = {
        Authorization: `Bearer ${data.access_token}`,
      };

      const userResponse = await apiClient.get<UserResponse>("api/users/me", {
        headers,
      });

      const userId = userResponse.data.id;

      const rolesResponse = await apiClient.get<RoleResponse[]>(
        `/api/roles/user/${userId}`,
        { headers }
      );

      dispatch(
        login({
          userId: userResponse.data.id,
          email: userResponse.data.email,
          firstName: userResponse.data.first_name,
          lastName: userResponse.data.last_name,
          token: data.access_token,
          roles: rolesResponse.data.map((role) => role.name),
        })
      );

      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) {
        toast({
          variant: "destructive",
          title: "Email or password is incorrect",
        });
      } else {
        toast({
          variant: "destructive",
          title: "An error occurred",
        });
      }
    },
  });
};
