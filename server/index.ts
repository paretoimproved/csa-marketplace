import express, { Request, Response } from 'express';
import cors from 'cors';
import { validateUser, createUser } from '../src/services/database';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

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

app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await createUser({ email, password, firstName, lastName, role });
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});