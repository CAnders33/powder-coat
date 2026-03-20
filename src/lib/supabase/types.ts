export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          phone: string;
          date: string;
          make_model: string;
          number_of_parts: number;
          details: string | null;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          phone: string;
          date: string;
          make_model: string;
          number_of_parts: number;
          details?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          phone?: string;
          date?: string;
          make_model?: string;
          number_of_parts?: number;
          details?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
