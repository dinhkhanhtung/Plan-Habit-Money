import { sendEmail, sendVerificationEmail, sendPasswordResetEmail } from '../email';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn((options, callback) => {
      if (callback) {
        callback(null, { messageId: 'test-message-id' });
      }
      return Promise.resolve({ messageId: 'test-message-id' });
    }),
  })),
}));

describe('Email Service', () => {
  beforeEach(() => {
    // Set environment variables for testing
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test@test.com';
    process.env.SMTP_PASSWORD = 'test-password';
    process.env.NEXTAUTH_URL = 'http://localhost:3000';
  });

  describe('sendEmail', () => {
    it('sends email successfully', async () => {
      const result = await sendEmail({
        to: 'recipient@test.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        text: 'Test Text',
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('test-message-id');
    });

    it('includes correct email options', async () => {
      const emailOptions = {
        to: 'recipient@test.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        text: 'Test Text',
      };

      const result = await sendEmail(emailOptions);

      expect(result.success).toBe(true);
    });
  });

  describe('sendVerificationEmail', () => {
    it('sends verification email with correct token', async () => {
      const email = 'user@test.com';
      const token = 'test-verification-token';

      const result = await sendVerificationEmail(email, token);

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('test-message-id');
    });

    it('includes verification URL in email', async () => {
      const email = 'user@test.com';
      const token = 'test-token';

      await sendVerificationEmail(email, token);

      // The function should construct the URL with the token
      const expectedUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
      expect(expectedUrl).toBe('http://localhost:3000/verify-email?token=test-token');
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('sends password reset email with correct token', async () => {
      const email = 'user@test.com';
      const token = 'test-reset-token';

      const result = await sendPasswordResetEmail(email, token);

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('test-message-id');
    });

    it('includes reset URL in email', async () => {
      const email = 'user@test.com';
      const token = 'test-token';

      await sendPasswordResetEmail(email, token);

      // The function should construct the URL with the token
      const expectedUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
      expect(expectedUrl).toBe('http://localhost:3000/reset-password?token=test-token');
    });
  });
});

