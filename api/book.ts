import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { validateBookingForm, hasValidationErrors } from '../src/utils/validation';
import type { BookingFormData, BookingFormErrors } from '../src/types/booking';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_DOMAIN || 'https://yourdomain.com'
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

// Environment variables validation
function validateEnvironmentVariables(): { isValid: boolean; missing: string[] } {
  const required = [
    'VITE_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'RESEND_API_KEY'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  return { isValid: missing.length === 0, missing };
}

// Create Supabase client with service role key for server-side operations
function createSupabaseClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Create Resend client
function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing Resend API key');
  }
  
  return new Resend(apiKey);
}

// Email templates
function createAdminNotificationEmail(booking: any) {
  const subject = `New Booking Request - ${booking.name}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 10px;">
        New Booking Request
      </h1>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #333;">Customer Information</h2>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Preferred Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Vehicle:</strong> ${booking.makeModel}</p>
        <p><strong>Number of Parts:</strong> ${booking.numberOfParts}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-left: 4px solid #1976d2; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Project Details</h3>
        <p style="white-space: pre-wrap;">${booking.details || 'No additional details provided.'}</p>
      </div>
      
      <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #1976d2; font-weight: bold;">
          📋 Booking ID: ${booking.id}
        </p>
      </div>
      
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        This booking was submitted through your website contact form.
      </p>
    </div>
  `;
  
  const text = `
New Booking Request

Customer Information:
- Name: ${booking.name}
- Phone: ${booking.phone}
- Preferred Date: ${new Date(booking.date).toLocaleDateString()}
- Vehicle: ${booking.makeModel}
- Number of Parts: ${booking.numberOfParts}

Project Details:
${booking.details || 'No additional details provided.'}

Booking ID: ${booking.id}
  `;
  
  return { subject, html, text };
}

function createCustomerConfirmationEmail(booking: any) {
  const subject = `Booking Confirmation - Powder Coating Service`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 10px;">
        Booking Confirmation
      </h1>
      
      <p>Hi ${booking.name},</p>
      
      <p>Thank you for your interest in our powder coating services! We've received your booking request and will get back to you within 24 hours.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #333;">Your Booking Details</h2>
        <p><strong>Preferred Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Vehicle:</strong> ${booking.makeModel}</p>
        <p><strong>Number of Parts:</strong> ${booking.numberOfParts}</p>
        <p><strong>Booking Reference:</strong> ${booking.id}</p>
      </div>
      
      <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #2e7d32;">What's Next?</h3>
        <ol style="margin: 0; padding-left: 20px;">
          <li>We'll review your request and prepare a detailed quote</li>
          <li>Our team will contact you within 24 hours</li>
          <li>We'll schedule your appointment at a convenient time</li>
        </ol>
      </div>
      
      <p>If you have any questions or need to make changes to your booking, please don't hesitate to contact us:</p>
      <p>📞 Phone: (555) 123-4567<br>✉️ Email: info@powdercoating.com</p>
      
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        Thank you for choosing our powder coating services!
      </p>
    </div>
  `;
  
  const text = `
Booking Confirmation - Powder Coating Service

Hi ${booking.name},

Thank you for your interest in our powder coating services! We've received your booking request and will get back to you within 24 hours.

Your Booking Details:
- Preferred Date: ${new Date(booking.date).toLocaleDateString()}
- Vehicle: ${booking.makeModel}
- Number of Parts: ${booking.numberOfParts}
- Booking Reference: ${booking.id}

What's Next?
1. We'll review your request and prepare a detailed quote
2. Our team will contact you within 24 hours
3. We'll schedule your appointment at a convenient time

If you have any questions, contact us:
Phone: (555) 123-4567
Email: info@powdercoating.com

Thank you for choosing our powder coating services!
  `;
  
  return { subject, html, text };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for all requests
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST to submit a booking.' 
    });
  }

  try {
    // Validate environment variables
    const envValidation = validateEnvironmentVariables();
    if (!envValidation.isValid) {
      console.error('Missing environment variables:', envValidation.missing);
      return res.status(500).json({
        success: false,
        error: 'Server configuration error. Please try again later.',
      });
    }

    // Parse and validate request body
    const bookingData = req.body as BookingFormData;
    
    if (!bookingData) {
      return res.status(400).json({
        success: false,
        error: 'Request body is required',
      });
    }

    // Validate booking data
    const validationErrors = validateBookingForm(bookingData);
    
    if (hasValidationErrors(validationErrors)) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Create Supabase client
    const supabase = createSupabaseClient();

    // Insert booking into database
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        name: bookingData.name.trim(),
        phone: bookingData.phone.trim(),
        date: bookingData.date,
        make_model: bookingData.makeModel.trim(),
        number_of_parts: bookingData.numberOfParts,
        details: bookingData.details?.trim() || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError || !booking) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save booking. Please try again.',
      });
    }

    // Prepare booking data for emails
    const bookingForEmail = {
      id: booking.id,
      name: booking.name,
      phone: booking.phone,
      date: booking.date,
      makeModel: booking.make_model,
      numberOfParts: booking.number_of_parts,
      details: booking.details,
    };

    // Send email notifications (don't fail the request if emails fail)
    try {
      const resend = createResendClient();
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@powdercoating.com';
      const fromEmail = process.env.FROM_EMAIL || 'bookings@powdercoating.com';
      
      // Create email templates
      const adminNotification = createAdminNotificationEmail(bookingForEmail);
      const customerConfirmation = createCustomerConfirmationEmail(bookingForEmail);

      // Send admin notification
      const adminEmailPromise = resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        subject: adminNotification.subject,
        html: adminNotification.html,
        text: adminNotification.text,
      });

      // Note: In a real application, you'd want to collect customer email
      // For now, we'll just send the admin notification
      await adminEmailPromise;

      console.log('Admin notification email sent successfully');

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the entire request if emails fail
      // The booking was still saved successfully
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Booking submitted successfully! We will contact you within 24 hours.',
      data: {
        id: booking.id,
        status: booking.status,
        submittedAt: booking.created_at,
      },
    });

  } catch (error) {
    console.error('Booking API error:', error);
    
    // Don't expose internal error details to client
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    });
  }
}
