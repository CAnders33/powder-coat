// Simple test for the booking API
// Run this in your browser console or use a tool like Postman

const testBooking = {
  name: "John Doe",
  phone: "(555) 123-4567", 
  date: "2024-03-15",
  makeModel: "2020 Toyota Camry",
  numberOfParts: 4,
  details: "Need powder coating for wheel rims in matte black"
};

// Test function
async function testBookingAPI() {
  try {
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testBooking)
    });
    
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Booking submitted successfully!');
      console.log('Booking ID:', result.data.id);
    } else {
      console.log('❌ Booking failed:', result.error);
      if (result.errors) {
        console.log('Validation errors:', result.errors);
      }
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Run the test
// testBookingAPI();
