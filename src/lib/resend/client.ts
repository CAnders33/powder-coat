import { Resend } from 'resend';

// Initialize Resend (only for server-side API routes)
export const createResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing Resend API key');
  }
  
  return new Resend(apiKey);
};
