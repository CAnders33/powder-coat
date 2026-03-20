-- Create the bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    make_model VARCHAR(255) NOT NULL,
    number_of_parts INTEGER NOT NULL CHECK (number_of_parts > 0),
    details TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Create an index on the date field for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(date);

-- Create an index on the status field for filtering
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Create an index on the created_at field for ordering
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at);

-- Create a function to update the updated_at column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at on row changes
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON public.bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow public to insert bookings (for the booking form)
CREATE POLICY "Allow public booking creation" ON public.bookings
    FOR INSERT WITH CHECK (true);

-- Allow service role to do everything (for admin operations)
CREATE POLICY "Allow service role full access" ON public.bookings
    FOR ALL USING (auth.role() = 'service_role');

-- Optionally, create a view for public booking statistics (without sensitive data)
CREATE OR REPLACE VIEW public.booking_stats AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    status,
    COUNT(*) as count
FROM public.bookings
GROUP BY DATE_TRUNC('month', created_at), status
ORDER BY month DESC;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT ON public.bookings TO anon;
GRANT ALL ON public.bookings TO authenticated;
GRANT SELECT ON public.booking_stats TO anon, authenticated;

-- Add some comments for documentation
COMMENT ON TABLE public.bookings IS 'Stores customer booking requests for powder coating services';
COMMENT ON COLUMN public.bookings.name IS 'Customer full name';
COMMENT ON COLUMN public.bookings.phone IS 'Customer phone number';
COMMENT ON COLUMN public.bookings.date IS 'Requested service date';
COMMENT ON COLUMN public.bookings.make_model IS 'Vehicle make and model';
COMMENT ON COLUMN public.bookings.number_of_parts IS 'Number of parts to be coated';
COMMENT ON COLUMN public.bookings.details IS 'Additional details or special requests';
COMMENT ON COLUMN public.bookings.status IS 'Booking status: pending, confirmed, completed, or cancelled';
