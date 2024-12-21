import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode | ((props: { user: any }) => React.ReactNode);
  role?: 'FARMER' | 'CUSTOMER';
}

export const ProtectedRoute = ({ children, role }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  if (typeof children === 'function') {
    return children({ user });
  }

  return <>{children}</>;
};