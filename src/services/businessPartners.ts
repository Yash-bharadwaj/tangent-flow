
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BusinessPartner, BusinessPartnerInput } from "@/types/businessPartner";

export const createBusinessPartner = async (data: BusinessPartnerInput): Promise<BusinessPartner | null> => {
  try {
    console.log("Creating business partner with data:", data);
    
    // We don't need to provide bp_code as it's auto-generated by a database trigger
    const { data: newPartner, error } = await supabase
      .from('business_partners')
      .insert({...data, bp_code: '' }) // Provide a placeholder that will be overwritten by the trigger
      .select('*');

    if (error) {
      if (error.message.includes('timeout') || error.message.includes('statement timeout')) {
        console.log("Timeout error, checking if the business partner was created");
        
        // Wait a moment to allow potential async DB operations to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if the business partner was actually created despite the timeout
        const { data: checkPartner } = await supabase
          .from('business_partners')
          .select()
          .match({ 
            bp_name: data.bp_name, 
            contact_person: data.contact_person
          })
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (checkPartner && checkPartner.length > 0) {
          console.log("Business Partner was created despite timeout:", checkPartner[0]);
          toast.success('Business Partner created successfully');
          return checkPartner[0];
        }
        
        console.error("Business Partner creation failed after timeout check", error);
        toast.error('Request timed out. Please try again with simplified data.');
        return null;
      } else if (error.message.includes('duplicate key')) {
        console.error("Duplicate key error:", error);
        toast.error('A business partner with this code already exists.');
        return null;
      } else {
        console.error("Other database error:", error);
        toast.error(`Error creating business partner: ${error.message}`);
        return null;
      }
    }
    
    if (!newPartner || newPartner.length === 0) {
      console.error("No data returned from successful insert");
      toast.error('Business partner creation did not return expected data');
      return null;
    }
    
    console.log("Business Partner created successfully:", newPartner);
    toast.success('Business Partner created successfully');
    return Array.isArray(newPartner) ? newPartner[0] : newPartner;
  } catch (error: any) {
    console.error('Unexpected error:', error);
    toast.error(`Error creating business partner: ${error.message || 'Unknown error'}`);
    return null;
  }
};

export const getBusinessPartners = async (): Promise<BusinessPartner[]> => {
  try {
    console.log("Fetching business partners");
    const { data, error } = await supabase
      .from('business_partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.message.includes('statement timeout')) {
        console.error("Timeout error fetching business partners:", error);
        toast.error('Request timed out while fetching business partners.');
      } else {
        console.error("Error fetching business partners:", error);
        toast.error(`Error fetching business partners: ${error.message}`);
      }
      console.error('Supabase error:', error);
      return [];
    }
    
    console.log("Fetched business partners:", data?.length || 0);
    return data || [];
  } catch (error: any) {
    console.error('Unexpected error:', error);
    toast.error(`Error fetching business partners: ${error.message || 'Unknown error'}`);
    return [];
  }
};
