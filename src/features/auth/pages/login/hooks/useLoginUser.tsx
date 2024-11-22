import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../../../lib/apiClient";
import { LoginFormData } from "../../../interfaces/loginFormData";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const useLoginUser = () => {
  const navigate = useNavigate();

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
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    },
  });
};
