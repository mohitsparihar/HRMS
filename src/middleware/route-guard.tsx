import { useAuth } from "@/hooks/useAuth";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/Home" />;
}
