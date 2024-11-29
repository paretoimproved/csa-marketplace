import nodemailer from 'nodemailer';

async function createTestAccount() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('\nEthereal Email Credentials:');
    console.log('------------------------');
    console.log('EMAIL_USER=', testAccount.user);
    console.log('EMAIL_PASS=', testAccount.pass);
    console.log('------------------------');
    console.log('\nAdd these credentials to your .env file\n');
  } catch (error) {
    console.error('Error creating test account:', error);
  }
}

createTestAccount();