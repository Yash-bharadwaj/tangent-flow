
export type BusinessPartner = {
  id: string;
  bp_code: string;
  bp_name: string;
  contact_person: string;
  phone_country?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  country?: string;
  payment_terms: string;
  payment_method?: string;
  bp_type?: string;
  material_1?: string;
  material_2?: string;
  material_3?: string;
  communication_method?: string;
  shipping_method?: string;
  created_at: string;
  updated_at: string;
};

export const PaymentTerms = [
  "Immediate",
  "1 Week",
  "10 Days",
  "15 Days",
  "30 Days",
  "45 Days",
] as const;

export const PaymentMethods = [
  "Bank Transfer",
  "Check",
  "Digital Payment (UPI)",
  "Credit / Debit Card",
  "Automatic Payment Run",
  "Integrations (PMW)",
] as const;

export const BPTypes = [
  "Customer",
  "Vendor",
  "Return Vendor",
  "Agent / Broker / Rep",
  "Alternate Payee",
  "Return Customer",
] as const;

export const CommunicationMethods = [
  "Email",
  "Message",
  "Whatsapp",
  "Telegram app",
  "Other",
] as const;

export const ShippingMethods = [
  "Transport",
  "Portal (Rapido, Portor)",
  "Express Shipping (Fedex, DHL)",
  "Customer Pickup",
  "Free Delivery",
  "COD",
  "Third-Party",
  "Rapido",
  "ACPL",
  "Courier",
  "Own Transport",
  "Customer Transport",
] as const;
