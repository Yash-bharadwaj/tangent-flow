
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Material } from "@/types/material";
import { BusinessPartner } from "@/types/businessPartner";

// Updated MaterialInput type to remove material_code from required fields
export type MaterialInput = Omit<Material, 'id' | 'created_at' | 'updated_at' | 'material_code'>;

export const createMaterial = async (data: MaterialInput): Promise<Material | null> => {
  try {
    // Here's the key fix: Insert with material_code explicitly set to null to trigger auto-generation
    const { data: newMaterial, error } = await supabase
      .from('materials')
      .insert({ ...data, material_code: null })
      .select()
      .single();

    if (error) throw error;
    
    toast.success('Material created successfully');
    return newMaterial;
  } catch (error: any) {
    toast.error(`Error creating material: ${error.message}`);
    return null;
  }
};

export const getMaterials = async (): Promise<Material[]> => {
  try {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error fetching materials: ${error.message}`);
    return [];
  }
};

export const getBusinessPartnersForVendors = async (): Promise<BusinessPartner[]> => {
  try {
    const { data, error } = await supabase
      .from('business_partners')
      .select('*')
      .order('bp_name');

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error fetching vendors: ${error.message}`);
    return [];
  }
};
