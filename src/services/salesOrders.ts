import { supabase } from "@/integrations/supabase/client";
import { BusinessPartner } from "@/types/businessPartner";
import { Material } from "@/types/material";
import { SalesOrder } from "@/types/database";

export const createSalesOrder = async (data: Omit<SalesOrder, 'id' | 'created_at' | 'updated_at'>): Promise<SalesOrder | null> => {
  try {
    const { data: newOrder, error } = await supabase
      .from('sales_orders')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Error creating sales order:", error);
      return null;
    }

    return newOrder;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const getSalesOrders = async (): Promise<SalesOrder[]> => {
  try {
    const { data, error } = await supabase
      .from('sales_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching sales orders:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
};

export const updateSalesOrder = async (id: string, updates: Partial<SalesOrder>): Promise<SalesOrder | null> => {
  try {
    const { data, error } = await supabase
      .from('sales_orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating sales order:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const deleteSalesOrder = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('sales_orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting sales order:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected error:", error);
    return false;
  }
};

export const subscribeToSalesOrders = (callback: (payload: any) => void) => {
  return supabase
    .channel('public:sales_orders')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'sales_orders' }, callback)
    .subscribe()
};

export const getBusinessPartnersForSelect = async (): Promise<Pick<BusinessPartner, 'id' | 'bp_name' | 'bp_code'>[]> => {
  try {
    const { data, error } = await supabase
      .from('business_partners')
      .select('id, bp_name, bp_code')
      .order('bp_name');

    if (error) {
      console.error("Error fetching business partners:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
};

export const getMaterialsForSelect = async (): Promise<Pick<Material, 'id' | 'material_name' | 'material_code'>[]> => {
  try {
    const { data, error } = await supabase
      .from('materials')
      .select('id, material_name, material_code')
      .order('material_name');

    if (error) {
      console.error("Error fetching materials:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
};
