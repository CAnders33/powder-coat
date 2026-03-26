-- Create bookings table for powder coating business
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Customer Information (matching API expectations)
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  
  -- Project Details (matching API expectations)
  make_model VARCHAR(255) NOT NULL,
  number_of_parts INTEGER DEFAULT 1,
  details TEXT,
  
  -- Business Fields
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  estimated_cost DECIMAL(10,2),
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_date ON bookings(date);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Policy: Anyone can insert bookings (for the booking form)
CREATE POLICY "Anyone can create bookings" ON bookings
    FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users with admin role can view all bookings
CREATE POLICY "Admins can view all bookings" ON bookings
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'admin' OR 
        auth.jwt() ->> 'email' IN ('admin@yourcompany.com', 'bookings@yourcompany.com')
    );

-- Policy: Only authenticated users with admin role can update bookings
CREATE POLICY "Admins can update bookings" ON bookings
    FOR UPDATE USING (
        auth.jwt() ->> 'role' = 'admin' OR 
        auth.jwt() ->> 'email' IN ('admin@yourcompany.com', 'bookings@yourcompany.com')
    );

-- Policy: Only authenticated users with admin role can delete bookings
CREATE POLICY "Admins can delete bookings" ON bookings
    FOR DELETE USING (
        auth.jwt() ->> 'role' = 'admin' OR 
        auth.jwt() ->> 'email' IN ('admin@yourcompany.com', 'bookings@yourcompany.com')
    );

-- Insert some sample data for testing (REMOVE IN PRODUCTION)
INSERT INTO bookings (
    name, 
    phone, 
    date,
    make_model,
    number_of_parts,
    details,
    status
) VALUES 
(
    'John Smith',
    '(555) 123-4567',
    CURRENT_DATE + INTERVAL '7 days',
    '2020 Ford Mustang',
    3,
    'Need powder coating for wheels and trim pieces',
    'pending'
),
(
    'Jane Doe',
    '(555) 987-6543',
    CURRENT_DATE + INTERVAL '14 days',
    '2018 Chevy Camaro',
    1,
    'Engine bay restoration project',
    'confirmed'
);
