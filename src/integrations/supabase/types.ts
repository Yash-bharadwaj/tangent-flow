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
      business_partners: {
        Row: {
          address: string | null
          bp_code: string
          bp_name: string
          bp_type: string | null
          communication_method: string | null
          contact_person: string
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          material_1: string | null
          material_2: string | null
          material_3: string | null
          payment_method: string | null
          payment_terms: string
          phone_country: string | null
          phone_number: string | null
          shipping_method: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          bp_code: string
          bp_name: string
          bp_type?: string | null
          communication_method?: string | null
          contact_person: string
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          material_1?: string | null
          material_2?: string | null
          material_3?: string | null
          payment_method?: string | null
          payment_terms: string
          phone_country?: string | null
          phone_number?: string | null
          shipping_method?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          bp_code?: string
          bp_name?: string
          bp_type?: string | null
          communication_method?: string | null
          contact_person?: string
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          material_1?: string | null
          material_2?: string | null
          material_3?: string | null
          payment_method?: string | null
          payment_terms?: string
          phone_country?: string | null
          phone_number?: string | null
          shipping_method?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      deliveries: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          status: string | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          created_at: string | null
          id: string
          location: string | null
          product_id: string
          quantity: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location?: string | null
          product_id: string
          quantity?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string | null
          product_id?: string
          quantity?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          batch_managed: boolean | null
          created_at: string | null
          documentation_required: boolean | null
          gr_location: string | null
          id: string
          inbound_supply_type: string | null
          material_code: string
          material_name: string
          notes: string | null
          preferred_vendor_1: string | null
          preferred_vendor_2: string | null
          processing_time: number | null
          processing_time_unit: string | null
          procurement_type: string | null
          product_type: string
          qm_tolerance_percentage: number | null
          quality_check: string | null
          scrap_percentage: number | null
          serial_no: string | null
          specification: string | null
          temperature_control: string | null
          uom: string
          updated_at: string | null
        }
        Insert: {
          batch_managed?: boolean | null
          created_at?: string | null
          documentation_required?: boolean | null
          gr_location?: string | null
          id?: string
          inbound_supply_type?: string | null
          material_code: string
          material_name: string
          notes?: string | null
          preferred_vendor_1?: string | null
          preferred_vendor_2?: string | null
          processing_time?: number | null
          processing_time_unit?: string | null
          procurement_type?: string | null
          product_type: string
          qm_tolerance_percentage?: number | null
          quality_check?: string | null
          scrap_percentage?: number | null
          serial_no?: string | null
          specification?: string | null
          temperature_control?: string | null
          uom: string
          updated_at?: string | null
        }
        Update: {
          batch_managed?: boolean | null
          created_at?: string | null
          documentation_required?: boolean | null
          gr_location?: string | null
          id?: string
          inbound_supply_type?: string | null
          material_code?: string
          material_name?: string
          notes?: string | null
          preferred_vendor_1?: string | null
          preferred_vendor_2?: string | null
          processing_time?: number | null
          processing_time_unit?: string | null
          procurement_type?: string | null
          product_type?: string
          qm_tolerance_percentage?: number | null
          quality_check?: string | null
          scrap_percentage?: number | null
          serial_no?: string | null
          specification?: string | null
          temperature_control?: string | null
          uom?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "materials_preferred_vendor_1_fkey"
            columns: ["preferred_vendor_1"]
            isOneToOne: false
            referencedRelation: "business_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materials_preferred_vendor_2_fkey"
            columns: ["preferred_vendor_2"]
            isOneToOne: false
            referencedRelation: "business_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          stock: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          stock?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          stock?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sales_orders: {
        Row: {
          created_at: string | null
          currency: string
          customer_name: string
          expected_payment_date: string
          id: string
          material: string
          order_number: string
          order_status: string
          price: number
          quantity: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string
          customer_name: string
          expected_payment_date: string
          id?: string
          material: string
          order_number: string
          order_status: string
          price?: number
          quantity: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          customer_name?: string
          expected_payment_date?: string
          id?: string
          material?: string
          order_number?: string
          order_status?: string
          price?: number
          quantity?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
