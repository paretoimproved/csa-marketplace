import { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser } from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'farmer' | 'customer';
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const login = async (email: string, password: string) => {
      try {
        const { user, error } = await loginUser(email, password);
        
        if (error || !user) {
          throw new Error(error || 'Invalid credentials');
        }
        
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    };  

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};