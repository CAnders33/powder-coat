import { supabase, createServiceRoleClient } from './client';
import { BookingFormData, BookingSubmission } from '@/types/booking';
import type { Database } from './types';

type BookingRow = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

// Transform booking form data to database format
const transformFormDataToInsert = (data: BookingFormData): BookingInsert => ({
  name: data.name,
  phone: data.phone,
  date: data.date,
  make_model: data.makeModel,
  number_of_parts: data.numberOfParts,
  details: data.details || null,
  status: 'pending',
});

// Transform database row to booking submission format
const transformRowToSubmission = (row: BookingRow): BookingSubmission => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  date: row.date,
  makeModel: row.make_model,
  numberOfParts: row.number_of_parts,
  details: row.details || '',
  createdAt: row.created_at,
  status: row.status,
});

export const bookingOperations = {
  // Create a new booking (client-side)
  async createBooking(data: BookingFormData): Promise<{ data: BookingSubmission | null; error: string | null }> {
    try {
      const insertData = transformFormDataToInsert(data);
      
      const { data: result, error } = await supabase
        .from('bookings')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: 'Failed to create booking' };
      }

      return { data: transformRowToSubmission(result), error: null };
    } catch (err) {
      console.error('Booking creation error:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  },

  // Create booking with service role (server-side API route)
  async createBookingServerSide(data: BookingFormData): Promise<{ data: BookingSubmission | null; error: string | null }> {
    try {
      const serviceClient = createServiceRoleClient();
      const insertData = transformFormDataToInsert(data);
      
      const { data: result, error } = await serviceClient
        .from('bookings')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: 'Failed to create booking' };
      }

      return { data: transformRowToSubmission(result), error: null };
    } catch (err) {
      console.error('Booking creation error:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  },

  // Get booking by ID
  async getBooking(id: string): Promise<{ data: BookingSubmission | null; error: string | null }> {
    try {
      const { data: result, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: 'Booking not found' };
      }

      return { data: transformRowToSubmission(result), error: null };
    } catch (err) {
      console.error('Booking fetch error:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  },

  // Get all bookings (admin function)
  async getAllBookings(): Promise<{ data: BookingSubmission[] | null; error: string | null }> {
    try {
      const serviceClient = createServiceRoleClient();
      
      const { data: results, error } = await serviceClient
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: 'Failed to fetch bookings' };
      }

      const bookings = results.map(transformRowToSubmission);
      return { data: bookings, error: null };
    } catch (err) {
      console.error('Bookings fetch error:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  },

  // Update booking status
  async updateBookingStatus(id: string, status: BookingSubmission['status']): Promise<{ error: string | null }> {
    try {
      const serviceClient = createServiceRoleClient();
      
      const { error } = await serviceClient
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        return { error: 'Failed to update booking status' };
      }

      return { error: null };
    } catch (err) {
      console.error('Booking update error:', err);
      return { error: 'An unexpected error occurred' };
    }
  },
};
