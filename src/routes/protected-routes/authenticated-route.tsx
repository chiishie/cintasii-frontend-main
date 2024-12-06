import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector";

const AuthenticatedRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default AuthenticatedRoute;
