import { formatDate, formatPhoneNumber } from '@/utils/formatting';
import { COMPANY_INFO } from '@/utils/constants';

export interface EmailTemplateData {
  customerName: string;
  customerPhone: string;
  bookingDate: string;
  makeModel: string;
  numberOfParts: number;
  details: string;
  bookingId?: string;
}

export const createBookingNotificationEmail = (data: EmailTemplateData) => {
  const subject = `New Booking Request - ${data.customerName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px 20px; border: 1px solid #e5e7eb; }
          .footer { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; color: #64748b; }
          .booking-details { background: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .detail-row { display: flex; margin-bottom: 10px; }
          .detail-label { font-weight: bold; min-width: 140px; }
          .cta-button { background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">${COMPANY_INFO.name}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">New Booking Request Received</p>
          </div>
          
          <div class="content">
            <h2>New Booking Details</h2>
            <p>A new booking request has been submitted through your website.</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Customer Name:</span>
                <span>${data.customerName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone Number:</span>
                <span>${formatPhoneNumber(data.customerPhone)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Date:</span>
                <span>${formatDate(data.bookingDate)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Vehicle:</span>
                <span>${data.makeModel}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Number of Parts:</span>
                <span>${data.numberOfParts}</span>
              </div>
              ${data.details ? `
              <div class="detail-row">
                <span class="detail-label">Additional Details:</span>
                <span>${data.details}</span>
              </div>
              ` : ''}
              ${data.bookingId ? `
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span>${data.bookingId}</span>
              </div>
              ` : ''}
            </div>
            
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Contact the customer within 24 hours</li>
              <li>Confirm availability for the requested date</li>
              <li>Provide detailed quote if needed</li>
              <li>Update booking status in your system</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>This email was automatically generated from your website booking form.</p>
            <p>${COMPANY_INFO.name} • ${COMPANY_INFO.phone} • ${COMPANY_INFO.email}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Booking Request - ${COMPANY_INFO.name}

A new booking request has been submitted:

Customer Name: ${data.customerName}
Phone Number: ${formatPhoneNumber(data.customerPhone)}
Preferred Date: ${formatDate(data.bookingDate)}
Vehicle: ${data.makeModel}
Number of Parts: ${data.numberOfParts}
${data.details ? `Additional Details: ${data.details}` : ''}
${data.bookingId ? `Booking ID: ${data.bookingId}` : ''}

Please contact the customer within 24 hours to confirm availability and provide any additional information needed.
  `;

  return { subject, html, text };
};

export const createCustomerConfirmationEmail = (data: EmailTemplateData) => {
  const subject = `Booking Confirmation - ${COMPANY_INFO.name}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px 20px; border: 1px solid #e5e7eb; }
          .footer { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; color: #64748b; }
          .booking-summary { background: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .detail-row { display: flex; margin-bottom: 10px; }
          .detail-label { font-weight: bold; min-width: 140px; }
          .highlight-box { background: #dbeafe; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">${COMPANY_INFO.name}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your booking request!</p>
          </div>
          
          <div class="content">
            <h2>Hello ${data.customerName},</h2>
            <p>Thank you for choosing ${COMPANY_INFO.name} for your powder coating needs. We have received your booking request and will contact you within 24 hours to confirm availability and discuss the details.</p>
            
            <div class="booking-summary">
              <h3 style="margin-top: 0;">Your Booking Request Summary</h3>
              <div class="detail-row">
                <span class="detail-label">Preferred Date:</span>
                <span>${formatDate(data.bookingDate)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Vehicle:</span>
                <span>${data.makeModel}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Number of Parts:</span>
                <span>${data.numberOfParts}</span>
              </div>
              ${data.bookingId ? `
              <div class="detail-row">
                <span class="detail-label">Reference ID:</span>
                <span>${data.bookingId}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0;">What happens next?</h3>
              <ul style="margin-bottom: 0;">
                <li>We'll contact you within 24 hours</li>
                <li>Confirm availability for your preferred date</li>
                <li>Discuss your specific requirements</li>
                <li>Provide a detailed quote</li>
                <li>Schedule your appointment</li>
              </ul>
            </div>
            
            <p>If you have any immediate questions, please don't hesitate to contact us at ${formatPhoneNumber(COMPANY_INFO.phone)} or reply to this email.</p>
            
            <p>We look forward to working with you!</p>
            <p>The ${COMPANY_INFO.name} Team</p>
          </div>
          
          <div class="footer">
            <p><strong>${COMPANY_INFO.name}</strong></p>
            <p>${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zip}</p>
            <p>Phone: ${COMPANY_INFO.phone} • Email: ${COMPANY_INFO.email}</p>
            <p style="margin-top: 15px;">${COMPANY_INFO.hours.weekday}<br>${COMPANY_INFO.hours.weekend}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Thank you for your booking request! - ${COMPANY_INFO.name}

Hello ${data.customerName},

Thank you for choosing ${COMPANY_INFO.name} for your powder coating needs. We have received your booking request and will contact you within 24 hours.

Your Booking Request Summary:
Preferred Date: ${formatDate(data.bookingDate)}
Vehicle: ${data.makeModel}
Number of Parts: ${data.numberOfParts}
${data.bookingId ? `Reference ID: ${data.bookingId}` : ''}

What happens next?
- We'll contact you within 24 hours
- Confirm availability for your preferred date
- Discuss your specific requirements
- Provide a detailed quote
- Schedule your appointment

If you have any questions, contact us at ${COMPANY_INFO.phone} or reply to this email.

${COMPANY_INFO.name}
${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zip}
Phone: ${COMPANY_INFO.phone}
Email: ${COMPANY_INFO.email}

${COMPANY_INFO.hours.weekday}
${COMPANY_INFO.hours.weekend}
  `;

  return { subject, html, text };
};
