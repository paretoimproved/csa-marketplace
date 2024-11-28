import express, { Request, Response } from 'express';
import cors from 'cors';
import { validateUser } from '../src/services/database';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt received:', { email, password: '***' });
    
    const user = await validateUser(email, password);
    console.log('Validation result:', { 
      success: !!user, 
      email: user?.email,
      role: user?.role 
    });
    
    if (!user) {
      console.log('Login failed: Invalid credentials');
      return res.status(401).json({ user: null, error: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    console.log('Login successful:', userWithoutPassword);
    return res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ user: null, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});