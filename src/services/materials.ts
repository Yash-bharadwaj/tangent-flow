
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Material } from "@/types/material";
import { BusinessPartner } from "@/types/businessPartner";

export type MaterialInput = Omit<Material, 'id' | 'material_code' | 'created_at' | 'updated_at'>;

export const createMaterial = async (data: MaterialInput): Promise<Material | null> => {
  try {
    const { data: newMaterial, error } = await supabase
      .from('materials')
      .insert(data)
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
