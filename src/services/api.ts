interface LoginResponse {
    user: {
      id: string;
      email: string;
      role: 'FARMER' | 'CUSTOMER';
      firstName: string;
      lastName: string;
    } | null;
    error?: string;
  }
  
  export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { user: null, error: data.error || 'Login failed' };
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { user: null, error: 'Network error' };
    }
  };