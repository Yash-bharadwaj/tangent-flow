
import { z } from "zod";

export const formSchema = z.object({
  bp_name: z.string().min(1, "Business partner name is required").max(100, "Maximum 100 characters"),
  contact_person: z.string().min(1, "Contact person is required").max(50, "Maximum 50 characters"),
  phone_country: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().email("Invalid email format").optional().or(z.literal('')),
  address: z.string().optional(),
  country: z.string().optional(),
  payment_terms: z.string().min(1, "Payment terms is required"),
  payment_method: z.string().optional(),
  bp_type: z.string().optional(),
  material_1: z.string().optional(),
  material_2: z.string().optional(),
  material_3: z.string().optional(),
  communication_method: z.string().optional(),
  shipping_method: z.string().optional(),
});
