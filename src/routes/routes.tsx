import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/features/auth/pages/login/Login";
import { Register } from "@/features/auth/pages/register/Register";
import Dashboard from "@/features/dashboard/pages/dashboard/Dashboard";
import AuthenticatedRoutes from "@/routes/protected-routes/authenticated-route";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    element: <AuthenticatedRoutes />,
    children: [{ path: "", element: <Dashboard /> }],
  },
]);

export default router;
