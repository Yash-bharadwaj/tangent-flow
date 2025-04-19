
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define Business Partner type
export interface BusinessPartner {
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
}

// Define type for creating a business partner
export type CreateBusinessPartnerInput = Omit<
  BusinessPartner,
  "id" | "bp_code" | "created_at" | "updated_at"
>;

// Mock data for business partners since the table doesn't exist in Supabase yet
const mockBusinessPartners: BusinessPartner[] = [
  {
    id: "1",
    bp_code: "BP001",
    bp_name: "Acme Corp",
    contact_person: "John Doe",
    phone_country: "+1",
    phone_number: "555-1234",
    email: "john@acmecorp.com",
    address: "123 Main St, Anytown, USA",
    country: "United States",
    payment_terms: "30 Days",
    payment_method: "Bank Transfer",
    bp_type: "Customer",
    material_1: "Steel",
    material_2: "Aluminum",
    material_3: null,
    communication_method: "Email",
    shipping_method: "Express",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    bp_code: "BP002",
    bp_name: "Globex Industries",
    contact_person: "Jane Smith",
    phone_country: "+44",
    phone_number: "123-4567",
    email: "jane@globex.com",
    address: "456 High St, London, UK",
    country: "United Kingdom",
    payment_terms: "45 Days",
    payment_method: "Check",
    bp_type: "Vendor",
    material_1: "Plastic",
    material_2: null,
    material_3: null,
    communication_method: "Whatsapp",
    shipping_method: "Standard",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Get all business partners (mocked for now)
export const getBusinessPartners = async (): Promise<BusinessPartner[]> => {
  try {
    // Since the business_partners table doesn't exist yet in the database schema
    // Return mock data instead
    return Promise.resolve(mockBusinessPartners);
    
    // Original code to use when table exists:
    // const { data, error } = await supabase
    //   .from("business_partners")
    //   .select("*")
    //   .order("created_at", { ascending: false });
    //
    // if (error) throw error;
    // return data as BusinessPartner[];
  } catch (error: any) {
    toast.error(`Error fetching business partners: ${error.message}`);
    throw error;
  }
};

// Get a business partner by ID (mocked for now)
export const getBusinessPartnerById = async (id: string): Promise<BusinessPartner | null> => {
  try {
    // Mock implementation
    const partner = mockBusinessPartners.find(p => p.id === id);
    if (!partner) return null;
    return Promise.resolve(partner);
    
    // Original code to use when table exists:
    // const { data, error } = await supabase
    //   .from("business_partners")
    //   .select("*")
    //   .eq("id", id)
    //   .single();
    //
    // if (error) throw error;
    // return data as BusinessPartner;
  } catch (error: any) {
    toast.error(`Error fetching business partner: ${error.message}`);
    throw error;
  }
};

// Create business partner (mocked for now)
export const createBusinessPartner = async (
  partner: CreateBusinessPartnerInput
): Promise<BusinessPartner | null> => {
  try {
    // Mock implementation
    const newId = (mockBusinessPartners.length + 1).toString();
    const bpCode = `BP${newId.padStart(3, '0')}`;
    const newPartner: BusinessPartner = {
      ...partner,
      id: newId,
      bp_code: bpCode,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    mockBusinessPartners.push(newPartner);
    toast.success(`Business partner ${partner.bp_name} has been created successfully`);
    return newPartner;
    
    // Original code to use when table exists:
    // const { data, error } = await supabase
    //   .from("business_partners")
    //   .insert(partner)
    //   .select()
    //   .single();
    //
    // if (error) throw error;
    //
    // toast.success(`Business partner ${data.bp_name} has been created successfully`);
    // return data as BusinessPartner;
  } catch (error: any) {
    toast.error(`Error creating business partner: ${error.message}`);
    throw error;
  }
};

// Update business partner (mocked for now)
export const updateBusinessPartner = async (
  id: string,
  updates: Partial<BusinessPartner>
): Promise<BusinessPartner | null> => {
  try {
    // Mock implementation
    const partnerIndex = mockBusinessPartners.findIndex(p => p.id === id);
    if (partnerIndex === -1) throw new Error("Business partner not found");
    
    mockBusinessPartners[partnerIndex] = {
      ...mockBusinessPartners[partnerIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    toast.success(`Business partner ${mockBusinessPartners[partnerIndex].bp_name} has been updated successfully`);
    return mockBusinessPartners[partnerIndex];
    
    // Original code to use when table exists:
    // const { data, error } = await supabase
    //   .from("business_partners")
    //   .update(updates)
    //   .eq("id", id)
    //   .select()
    //   .single();
    //
    // if (error) throw error;
    //
    // toast.success(`Business partner ${data.bp_name} has been updated successfully`);
    // return data as BusinessPartner;
  } catch (error: any) {
    toast.error(`Error updating business partner: ${error.message}`);
    throw error;
  }
};

// Delete business partner (mocked for now)
export const deleteBusinessPartner = async (id: string): Promise<boolean> => {
  try {
    // Mock implementation
    const partnerIndex = mockBusinessPartners.findIndex(p => p.id === id);
    if (partnerIndex === -1) throw new Error("Business partner not found");
    
    mockBusinessPartners.splice(partnerIndex, 1);
    toast.success("Business partner deleted successfully");
    return true;
    
    // Original code to use when table exists:
    // const { error } = await supabase
    //   .from("business_partners")
    //   .delete()
    //   .eq("id", id);
    //
    // if (error) throw error;
    //
    // toast.success("Business partner deleted successfully");
    // return true;
  } catch (error: any) {
    toast.error(`Error deleting business partner: ${error.message}`);
    throw error;
  }
};

// Subscribe to business partners real-time updates (mocked for now)
export const subscribeToBusinessPartners = (callback: (payload: any) => void) => {
  // Just return a mock channel object that can be unsubscribed
  return {
    unsubscribe: () => {}
  };
  
  // Original code to use when table exists:
  // const channel = supabase.channel('business-partners-channel');
  // 
  // channel
  //   .on('postgres_changes', { 
  //     event: '*', 
  //     schema: 'public', 
  //     table: 'business_partners'
  //   }, (payload) => {
  //     callback(payload);
  //   })
  //   .subscribe();
  // 
  // return channel;
};
