export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      property_listings: {
        Row: {
          id: string
          title: string
          description: string | null
          address: string | null
          city: string | null
          state: string | null
          price: number | null
          status: string
          sponsor_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          price?: number | null
          status?: string
          sponsor_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          price?: number | null
          status?: string
          sponsor_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
