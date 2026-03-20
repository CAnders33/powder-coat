# API Setup Guide

## Overview

The `/api/book` serverless function handles booking form submissions, validates data, stores bookings in Supabase, and sends email notifications via Resend.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your actual values:

```bash
# Required for Sanity CMS
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-02-16

# Required for Supabase Database
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Required for Email Notifications
RESEND_API_KEY=re_your_api_key

# Optional Email Configuration
ADMIN_EMAIL=admin@yourcompany.com
FROM_EMAIL=bookings@yourcompany.com
PRODUCTION_DOMAIN=https://yourcompany.com
```

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL from `supabase_setup.sql` to create the bookings table
3. Get your project URL and keys from Settings > API
4. Add the service role key (for server-side operations) to your environment variables

### 2. Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add your domain for sending emails
4. Update the `FROM_EMAIL` environment variable with your verified domain

### 3. Email Configuration

The API sends two types of emails:
- **Admin Notification**: Sent to `ADMIN_EMAIL` when a new booking is received
- **Customer Confirmation**: (Future feature - requires customer email field)

## API Endpoint

### `POST /api/book`

Submits a new booking request.

#### Request Body

```json
{
  "name": "John Doe",
  "phone": "(555) 123-4567",
  "date": "2024-03-15",
  "makeModel": "2020 Toyota Camry",
  "numberOfParts": 4,
  "details": "Need powder coating for wheel rims in matte black"
}
```

#### Response (Success)

```json
{
  "success": true,
  "message": "Booking submitted successfully! We will contact you within 24 hours.",
  "data": {
    "id": "uuid-here",
    "status": "pending",
    "submittedAt": "2024-02-17T10:30:00Z"
  }
}
```

#### Response (Validation Error)

```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "name": "Name is required",
    "phone": "Please enter a valid phone number"
  }
}
```

## Security Features

- ✅ **Input Validation**: All form data is validated server-side
- ✅ **CORS Protection**: Restricts requests to allowed origins
- ✅ **Environment Variables**: Secrets are not exposed in code
- ✅ **Error Handling**: Internal errors don't expose sensitive information
- ✅ **SQL Injection Protection**: Uses Supabase client with prepared statements
- ✅ **Rate Limiting**: Handled by Vercel's edge network

## Database Schema

The bookings are stored in a `bookings` table with the following structure:

```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  make_model TEXT NOT NULL,
  number_of_parts INTEGER NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Local Development

1. Install dependencies: `npm install`
2. Set up environment variables in `.env.local`
3. Start development server: `npm run dev`
4. Test the API at `http://localhost:5173/api/book`

## Deployment

The API is automatically deployed to Vercel when you push to your repository. Make sure to add all environment variables to your Vercel project settings.

## Monitoring

- Check Vercel Function logs for errors
- Monitor Supabase dashboard for database activity
- Review Resend dashboard for email delivery status
