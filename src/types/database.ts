
// Database types for the application
export type SalesOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  order_status: string;
  material: string;
  quantity: number;
  price: number;
  currency: string;
  expected_payment_date: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
};

// Legacy type aliases for compatibility
export type Order = SalesOrder;

export type Product = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Inventory = {
  id: string;
  product_id: string;
  quantity: number;
  location: string;
  created_at: string;
  updated_at: string;
};

export type Delivery = {
  id: string;
  order_id: string;
  status: string;
  delivery_date: string;
  address: string;
  created_at: string;
  updated_at: string;
};
