export interface AuthState {
  isLoggedIn: boolean;
  firstName: string;
  email: string;
  lastName: string;
  userId: string;
  token: string;
  roles: string[];
}
