import type { VercelRequest, VercelResponse } from '@vercel/node';
import { bookingOperations } from '../src/lib/supabase/bookings';
import { createResendClient } from '../src/lib/resend/client';
import { 
  createBookingNotificationEmail, 
  createCustomerConfirmationEmail,
  type EmailTemplateData 
} from '../src/lib/resend/templates';
import { validateBookingForm, hasValidationErrors } from '../src/utils/validation';
import type { BookingFormData } from '../src/types/booking';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    const bookingData = req.body as BookingFormData;

    // Validate the incoming data
    const validationErrors = validateBookingForm(bookingData);
    
    if (hasValidationErrors(validationErrors)) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Save booking to Supabase
    const { data: booking, error: dbError } = await bookingOperations.createBookingServerSide(bookingData);
    
    if (dbError || !booking) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save booking',
      });
    }

    // Prepare email data
    const emailData: EmailTemplateData = {
      customerName: booking.name,
      customerPhone: booking.phone,
      bookingDate: booking.date,
      makeModel: booking.makeModel,
      numberOfParts: booking.numberOfParts,
      details: booking.details,
      bookingId: booking.id,
    };

    // Send emails using Resend
    try {
      const resend = createResendClient();
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@yourcompany.com';
      const notificationEmail = process.env.NOTIFICATION_EMAIL || adminEmail;
      
      // Create email templates
      const adminNotification = createBookingNotificationEmail(emailData);
      const customerConfirmation = createCustomerConfirmationEmail(emailData);

      // Send notification email to admin
      await resend.emails.send({
        from: 'bookings@yourcompany.com',
        to: [notificationEmail],
        subject: adminNotification.subject,
        html: adminNotification.html,
        text: adminNotification.text,
      });

      // Send confirmation email to customer
      await resend.emails.send({
        from: 'bookings@yourcompany.com',
        to: [booking.phone], // In production, use a proper email field
        subject: customerConfirmation.subject,
        html: customerConfirmation.html,
        text: customerConfirmation.text,
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the entire request if emails fail
      // The booking was still saved successfully
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Booking submitted successfully',
      data: {
        id: booking.id,
        status: booking.status,
      },
    });

  } catch (error) {
    console.error('Booking API error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
