export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  makeModel: string;
  numberOfParts: number;
  details: string;
}

export interface BookingSubmission extends BookingFormData {
  id?: string;
  createdAt?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface BookingFormErrors {
  name?: string;
  phone?: string;
  date?: string;
  makeModel?: string;
  numberOfParts?: string;
  details?: string;
}
