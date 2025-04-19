

import type { Database } from "@/integrations/supabase/types";

// Profile type from the profiles table
export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
};

// Order type from the orders table
export type Order = {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
};

// Sales Order type from the sales_orders table
export type SalesOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  order_status: string;
  material: string;
  quantity: number;
  expected_payment_date: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
};

// Product type from the products table
export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
};

// Inventory type from the inventory table
export type Inventory = {
  id: string;
  product_id: string;
  quantity: number;
  location: string | null;
  created_at: string;
  updated_at: string;
};

// Delivery type from the deliveries table
export type Delivery = {
  id: string;
  order_id: string;
  status: string;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
};

// Business Partner type from the business_partners table
export type BusinessPartner = {
  id: string;
  bp_code: string;
  bp_name: string;
  contact_person: string;
  phone_country: string | null;
  phone_number: string | null;
  email: string | null;
  address: string | null;
  country: string | null;
  payment_terms: string;
  payment_method: string | null;
  bp_type: string | null;
  material_1: string | null;
  material_2: string | null;
  material_3: string | null;
  communication_method: string | null;
  shipping_method: string | null;
  created_at: string;
  updated_at: string;
};
