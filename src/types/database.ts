
// Update the SalesOrder type to include currency
export type SalesOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  order_status: string;
  material: string;
  quantity: number;
  price: number;
  currency: string; // New field
  expected_payment_date: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
};
