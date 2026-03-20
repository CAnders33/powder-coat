# Powder Coating Website - Folder Structure

## Recommended Project Structure

```
powder-coat/
├── src/
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── DatePicker.tsx
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   ├── features/                # Feature-specific components
│   │   │   ├── booking/
│   │   │   │   ├── BookingForm.tsx
│   │   │   │   └── BookingConfirmation.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── GalleryGrid.tsx
│   │   │   │   ├── ImageModal.tsx
│   │   │   │   └── GalleryItem.tsx
│   │   │   ├── services/
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   └── ServicesList.tsx
│   │   │   └── testimonials/
│   │   │       ├── TestimonialCard.tsx
│   │   │       └── TestimonialsList.tsx
│   │   └── common/                  # Shared components
│   │       ├── Hero.tsx
│   │       ├── Section.tsx
│   │       └── ContactInfo.tsx
│   ├── pages/                       # Page components
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Gallery.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Booking.tsx
│   ├── lib/                         # External service integrations
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── bookings.ts
│   │   │   └── types.ts
│   │   └── resend/
│   │       ├── client.ts
│   │       └── templates.ts
│   ├── hooks/                       # Custom React hooks
│   │   ├── useBooking.ts
│   │   ├── useGallery.ts
│   │   └── useSanityData.ts
│   ├── types/                       # TypeScript type definitions
│   │   ├── booking.ts
│   │   ├── gallery.ts
│   │   ├── services.ts
│   │   └── index.ts
│   ├── utils/                       # Utility functions
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── constants.ts
│   ├── styles/                      # Global styles
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── variables.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── api/                            # Vercel serverless functions
│   └── booking.ts
├── sanity-studio/                  # Sanity CMS studio
│   ├── schemas/
│   │   ├── hero.ts
│   │   ├── service.ts
│   │   ├── testimonial.ts
│   │   ├── gallery.ts
│   │   └── about.ts
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── public/
│   ├── images/
│   └── favicon.ico
├── .env.local
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── README.md
└── tailwind.config.js              # For styling (recommended)
```

## Key Architecture Decisions

### 1. Component Organization
- **UI Components**: Reusable, generic components (buttons, inputs, modals)
- **Layout Components**: Header, footer, navigation, and main layout
- **Feature Components**: Specific to business features (booking, gallery, services)
- **Common Components**: Shared across multiple pages but business-specific

### 2. External Services Structure
- **Sanity**: CMS client, queries, and type definitions
- **Supabase**: Database client, booking operations, and types
- **Resend**: Email client and template management

### 3. Type Safety
- Centralized type definitions for all data structures
- Strong typing for API responses and form data

### 4. Routing Structure
- Clean page-based routing with React Router
- Each page component handles its own data fetching

### 5. API Routes (Vercel Serverless)
- `/api/booking.ts` - Handles booking submissions
- Validates data, stores in Supabase, sends emails via Resend

## Benefits of This Structure

1. **Scalability**: Easy to add new features and components
2. **Maintainability**: Clear separation of concerns
3. **Type Safety**: Strong TypeScript integration throughout
4. **Reusability**: Components can be easily reused across pages
5. **Testing**: Structure supports easy unit and integration testing
6. **Developer Experience**: Intuitive folder organization
