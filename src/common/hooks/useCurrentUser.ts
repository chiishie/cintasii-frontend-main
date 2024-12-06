import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";

interface Role {
  name: string;
  id: number;
}

interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  first_name: string;
  last_name: string;
  roles: Role[];
}

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const [userResponse, rolesResponse] = await Promise.all([
        apiClient.get("/users/me"),
        apiClient.get("/roles"),
      ]);
      return {
        ...userResponse.data,
        roles: rolesResponse.data,
      };
    },
  });
};
