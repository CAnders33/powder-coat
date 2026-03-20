# Powder Coating Company Website

A modern, production-ready website for a powder coating company built with React, TypeScript, Vite, and integrated with Sanity CMS, Supabase, and Resend for a complete business solution.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **CMS**: Sanity (headless CMS)
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel
- **Date Picker**: MUI X Date Pickers

## 📁 Project Structure

```
powder-coat/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI elements (Button, Input, Modal, etc.)
│   │   ├── layout/         # Layout components (Header, Footer, Navigation)
│   │   ├── features/       # Feature-specific components
│   │   └── common/         # Shared business components
│   ├── pages/              # Page components
│   ├── lib/                # External service integrations
│   │   ├── sanity/         # Sanity CMS client and queries
│   │   ├── supabase/       # Supabase client and operations
│   │   └── resend/         # Email client and templates
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles and CSS
├── api/                    # Vercel serverless functions
├── sanity-studio/          # Sanity CMS studio configuration
├── public/                 # Static assets
└── config files
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- Git installed
- Accounts for: Sanity, Supabase, Resend, Vercel

### 2. Clone and Install

```bash
git clone <your-repo-url>
cd powder-coat
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Sanity CMS
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Email Configuration
NOTIFICATION_EMAIL=notifications@yourcompany.com
ADMIN_EMAIL=admin@yourcompany.com
```

### 4. Database Setup (Supabase)

1. Create a new Supabase project
2. Run the SQL setup script in your Supabase SQL editor:
   ```sql
   -- Copy and execute the contents of supabase_setup.sql
   ```
3. This creates the bookings table with proper RLS policies

### 5. CMS Setup (Sanity)

1. Install Sanity CLI: `npm install -g @sanity/cli`
2. Navigate to sanity-studio directory: `cd sanity-studio`
3. Run: `sanity init`
4. Follow the prompts to create your project
5. Deploy the studio: `sanity deploy`

### 6. Email Setup (Resend)

1. Create a Resend account
2. Verify your domain for sending emails
3. Generate an API key
4. Add the API key to your environment variables

### 7. Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 8. Deployment (Vercel)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📋 Features

### Public Pages
- **Home**: Hero section, featured services, testimonials, trust features
- **Services**: Complete service listings with descriptions and pricing
- **Gallery**: Responsive image gallery with modal/lightbox
- **About**: Company information and story
- **Contact**: Contact form and business information
- **Booking**: Interactive booking form with date picker

### CMS-Managed Content (Sanity)
- Hero section content
- Service descriptions and pricing
- About section content
- Testimonials
- Gallery images
- Trust/features section

### Booking System
- Form validation
- Date picker for scheduling
- Data storage in Supabase
- Automatic email notifications
- Admin booking management

### Technical Features
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Code splitting, image optimization
- **SEO Ready**: Meta tags, structured data
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: User-friendly loading indicators

## 🔧 Customization

### Styling
- Edit `tailwind.config.js` for design system changes
- Modify `src/styles/globals.css` for custom styles
- Update color scheme in Tailwind config

### Content
- Manage all content through Sanity Studio
- Add new content types in `sanity-studio/schemas/`
- Extend queries in `src/lib/sanity/queries.ts`

### Business Logic
- Booking validation in `src/utils/validation.ts`
- Email templates in `src/lib/resend/templates.ts`
- Database operations in `src/lib/supabase/`

## 🚀 Next Steps

1. **Install Dependencies**: Run `npm install` to install all packages
2. **Setup Services**: Configure Sanity, Supabase, and Resend accounts
3. **Environment Variables**: Add all required environment variables
4. **Database**: Run the SQL setup script in Supabase
5. **Development**: Start with `npm run dev`
6. **Content**: Add initial content through Sanity Studio
7. **Deploy**: Push to GitHub and connect to Vercel

## 📞 Support

For technical support or customization requests:
- Create an issue in this repository
- Check the documentation links in each integration
- Review the FOLDER_STRUCTURE.md for detailed architecture

## 📝 License

This project is licensed under the MIT License.