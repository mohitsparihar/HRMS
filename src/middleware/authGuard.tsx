import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
