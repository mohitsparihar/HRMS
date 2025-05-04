import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

/**
 * A route guard component that protects routes from unauthorized access.
 * 
 * This component acts as a wrapper for protected routes in the application.
 * It checks if the user is authenticated using the useAuth hook.
 * If the user is not authenticated, they are redirected to the home page.
 * If authenticated, it renders the child routes using React Router's Outlet.
 * 
 * ### Example
 * ```tsx
 * <Routes>
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 * </Routes>
 * ```
 */
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
