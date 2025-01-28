import express, { Request, Response } from 'express';
import cors from 'cors';
import { validateUser, createUser, verifyEmail } from '../src/services/database';
import { PrismaClient } from '@prisma/client';
import { sendVerificationEmail } from '../src/services/email';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '../src/services/email';

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
  } catch (err) {
    const error = err as Error;
    console.error('Login error:', error.message);
    console.error('Full login error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ 
      user: null, 
      error: error.message || 'Server error' 
    });
  }
});

app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    console.log('Registration attempt:', { email, firstName, lastName, role });
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'Email already registered' });
    }

    console.log('Creating new user...');
    const user = await createUser({ email, password, firstName, lastName, role });
    console.log('User created successfully:', user.id);
    
    // Send verification email
    try {
      console.log('Attempting to send verification email...');
      await sendVerificationEmail(email, user.verificationToken!, firstName);
      console.log('Verification email sent successfully');
    } catch (err) {
      const emailError = err as Error;
      console.error('Failed to send verification email:', emailError.message);
      console.error('Full email error:', {
        name: emailError.name,
        message: emailError.message,
        stack: emailError.stack
      });
      return res.status(500).json({ error: 'Failed to send verification email' });
    }

    const { password: _, verificationToken: __, ...userWithoutSensitiveInfo } = user;
    return res.status(201).json({ 
      user: userWithoutSensitiveInfo,
      message: 'Please check your email to verify your account' 
    });
  } catch (err) {
    const error = err as Error;
    console.error('Registration error:', error.message);
    console.error('Full registration error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ error: 'Registration failed' });
  }
});

app.get('/api/verify-email', async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    await verifyEmail(token as string);
    
    // Redirect to the success page
    res.redirect('http://localhost:5173/verify-success');
  } catch (error) {
    console.error('Verification error:', error);
    // Redirect to an error page or show error message
    res.redirect(`http://localhost:5173/verify-error?message=${encodeURIComponent(error instanceof Error ? error.message : 'Verification failed')}`);
  }
});

app.post('/api/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    
    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If an account exists, you will receive a reset email.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Save reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires
      }
    });

    // Send reset email
    await sendPasswordResetEmail(email, resetToken, user.firstName);
    
    res.json({ message: 'If an account exists, you will receive a reset email.' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Failed to process reset request' });
  }
});

app.post('/api/reset-password/verify', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date() // Token hasn't expired
        }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    res.json({ valid: true });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Failed to verify reset token' });
  }
});

app.post('/api/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    // Validate password
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Find user with valid token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date() // Token hasn't expired
        }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null
      }
    });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Get farm profile by farmer ID
app.get('/api/farms/farmer/:farmerId', async (req: Request, res: Response) => {
  try {
    const { farmerId } = req.params;
    
    const farmProfile = await prisma.farmProfile.findUnique({
      where: { farmerId },
      include: {
        location: true,
        images: true,
        products: true,
      },
    });

    if (!farmProfile) {
      return res.status(404).json({ error: 'Farm profile not found' });
    }

    res.json(farmProfile);
  } catch (error) {
    console.error('Error fetching farm profile:', error);
    res.status(500).json({ error: 'Failed to fetch farm profile' });
  }
});

// Create farm profile
app.post('/api/farms', async (req: Request, res: Response) => {
  try {
    const { farmerId, name, description, address, city, state, zipCode } = req.body;

    const farmProfile = await prisma.farmProfile.create({
      data: {
        farmerId,
        name,
        description,
        location: {
          create: {
            address,
            city,
            state,
            zipCode,
          },
        },
      },
      include: {
        location: true,
      },
    });

    res.status(201).json(farmProfile);
  } catch (error) {
    console.error('Error creating farm profile:', error);
    res.status(500).json({ error: 'Failed to create farm profile' });
  }
});

// Update the farm profile GET endpoint
app.get('/api/farms/:id', async (req: Request, res: Response) => {
  try {
    const farm = await prisma.farmProfile.findUnique({
      where: { id: req.params.id },
      include: { 
        location: true,
        crops: {  // Add crop calendar data
          select: {
            name: true,
            startMonth: true,
            endMonth: true,
            harvestWeek: true,
            yieldEstimate: true
          }
        }
      }
    });

    if (!farm) return res.status(404).json({ error: 'Farm not found' });
    res.json(farm);
  } catch (error) {
    console.error('Error fetching farm profile:', error);
    res.status(500).json({ error: 'Failed to fetch farm profile' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});