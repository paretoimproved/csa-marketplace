import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const prisma = new PrismaClient()

export const createUser = async (userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: 'FARMER' | 'CUSTOMER'
}) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const verificationToken = crypto.randomBytes(32).toString('hex')
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  return prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      verificationToken,
      verificationExpires,
      emailVerified: false
    }
  })
}

export const verifyEmail = async (token: string) => {
  const user = await prisma.user.findUnique({
    where: { verificationToken: token }
  })

  if (!user) {
    throw new Error('Invalid verification token')
  }

  if (user.verificationExpires && user.verificationExpires < new Date()) {
    throw new Error('Verification token has expired')
  }

  return prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
      verificationExpires: null
    }
  })
}

export const validateUser = async (email: string, password: string) => {
  console.log('Validating user:', email);
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('Database lookup result:', user ? 'User found' : 'User not found');
    
    if (!user) {
      console.log('User not found in database');
      return null;
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    console.log('Password validation:', isValid ? 'valid' : 'invalid');
    
    if (!isValid) {
      console.log('Invalid password');
      return null;
    }
    
    if (!user.emailVerified) {
      console.log('Email not verified');
      throw new Error('Please verify your email address before logging in');
    }
    
    return user;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}