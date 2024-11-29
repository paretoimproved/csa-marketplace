import { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser } from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'FARMER' | 'CUSTOMER';
  firstName: string;
  lastName: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role: 'FARMER' | 'CUSTOMER';
    }) => Promise<void>;
  }
  
  // Create the context
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  // Create the provider component
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
      // Initialize user from localStorage if available
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    });
  
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

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'FARMER' | 'CUSTOMER';
  }) => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Don't auto-login after registration since email needs to be verified
      // await login(userData.email, userData.password);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface LoginOptions {
  rememberMe?: boolean;
}

const login = async (
  email: string, 
  password: string, 
  options?: LoginOptions
) => {
  // ... login logic with remember me
};