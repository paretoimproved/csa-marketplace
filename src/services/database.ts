import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const createUser = async (userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: 'FARMER' | 'CUSTOMER'
}) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  return prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword
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
    
    return user;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};