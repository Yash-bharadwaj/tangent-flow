
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BusinessPartner } from "@/types/businessPartner";

export type BusinessPartnerInput = Omit<BusinessPartner, 'id' | 'bp_code' | 'created_at' | 'updated_at'>;

export const createBusinessPartner = async (data: BusinessPartnerInput): Promise<BusinessPartner | null> => {
  try {
    // The bp_code field is auto-generated on the server using a trigger
    // so we don't need to provide it
    const { data: newPartner, error } = await supabase
      .from('business_partners')
      .insert(data as any) // Using type assertion to bypass TypeScript's check
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
