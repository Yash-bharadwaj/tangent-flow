
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BusinessPartner } from "@/types/businessPartner";

export const createBusinessPartner = async (data: Omit<BusinessPartner, 'id' | 'bp_code' | 'created_at' | 'updated_at'>): Promise<BusinessPartner | null> => {
  try {
    const { data: newPartner, error } = await supabase
      .from('business_partners')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    
    toast.success('Business Partner created successfully');
    return newPartner;
  } catch (error: any) {
    toast.error(`Error creating business partner: ${error.message}`);
    return null;
  }
};

export const getBusinessPartners = async (): Promise<BusinessPartner[]> => {
  try {
    const { data, error } = await supabase
      .from('business_partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error fetching business partners: ${error.message}`);
    return [];
  }
};
