import nodemailer from 'nodemailer';

// For development, we can use a test SMTP service like Ethereal
// For production, you'd use a real email service like SendGrid or AWS SES
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (
  email: string,
  token: string,
  firstName: string
) => {
  const verificationUrl = `http://localhost:5173/verify-email?token=${token}`;

  const mailOptions = {
    from: '"CSA Marketplace" <noreply@csamarketplace.com>',
    to: email,
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to CSA Marketplace, ${firstName}!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  firstName: string
) => {
  const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

  const mailOptions = {
    from: '"CSA Marketplace" <noreply@csamarketplace.com>',
    to: email,
    subject: 'Reset Your Password',
    html: `
      <h1>Hello ${firstName}!</h1>
      <p>We received a request to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};