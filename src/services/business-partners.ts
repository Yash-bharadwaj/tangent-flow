
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

// Get all business partners
export const getBusinessPartners = async (): Promise<BusinessPartner[]> => {
  try {
    const { data, error } = await supabase
      .from("business_partners")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data as BusinessPartner[];
  } catch (error: any) {
    toast.error(`Error fetching business partners: ${error.message}`);
    throw error;
  }
};

// Get a business partner by ID
export const getBusinessPartnerById = async (id: string): Promise<BusinessPartner | null> => {
  try {
    const { data, error } = await supabase
      .from("business_partners")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data as BusinessPartner;
  } catch (error: any) {
    toast.error(`Error fetching business partner: ${error.message}`);
    throw error;
  }
};

// Create business partner
export const createBusinessPartner = async (
  partner: CreateBusinessPartnerInput
): Promise<BusinessPartner | null> => {
  try {
    const { data, error } = await supabase
      .from("business_partners")
      .insert({
        ...partner,
        bp_code: null // This will trigger the automatic generation
      })
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success(`Business partner ${partner.bp_name} has been created successfully`);
    return data as BusinessPartner;
  } catch (error: any) {
    toast.error(`Error creating business partner: ${error.message}`);
    throw error;
  }
};

// Update business partner
export const updateBusinessPartner = async (
  id: string,
  updates: Partial<BusinessPartner>
): Promise<BusinessPartner | null> => {
  try {
    const { data, error } = await supabase
      .from("business_partners")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success(`Business partner ${updates.bp_name || ''} has been updated successfully`);
    return data as BusinessPartner;
  } catch (error: any) {
    toast.error(`Error updating business partner: ${error.message}`);
    throw error;
  }
};

// Delete business partner
export const deleteBusinessPartner = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("business_partners")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    
    toast.success("Business partner deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(`Error deleting business partner: ${error.message}`);
    throw error;
  }
};

// Subscribe to business partners real-time updates
export const subscribeToBusinessPartners = (callback: (payload: any) => void) => {
  const channel = supabase.channel('business-partners-channel');
  
  channel
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'business_partners'
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
  
  return channel;
};
