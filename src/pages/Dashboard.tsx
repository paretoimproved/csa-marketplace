import { useAuth } from '../contexts/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.firstName}!</h1>
      <p>Role: {user?.role}</p>
    </div>
  );
};