import { useAuth } from '@/hooks/useAuth';
import { Loader } from 'lucide-react';
import {Navigate, Outlet} from 'react-router-dom'

export function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-between">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
