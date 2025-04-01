
import { supabase } from "@/integrations/supabase/client";
import { Profile, Order, Product, Inventory, Delivery, SalesOrder } from "@/types/database";
import { toast } from "sonner";
import { RealtimeChannel } from "@supabase/supabase-js";

// Profile related functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
      
    if (error) throw error;
    return data as Profile;
  } catch (error: any) {
    toast.error(`Error fetching profile: ${error.message}`);
    throw error;
  }
};

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
      
    if (error) throw error;
    toast.success("Profile updated successfully");
    return data as Profile;
  } catch (error: any) {
    toast.error(`Error updating profile: ${error.message}`);
    throw error;
  }
};

// Orders related functions
export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data as Order[];
  } catch (error: any) {
    toast.error(`Error fetching orders: ${error.message}`);
    throw error;
  }
};

// Sales Orders related functions
export const getSalesOrders = async (): Promise<SalesOrder[]> => {
  try {
    const { data, error } = await supabase
      .from("sales_orders")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data as SalesOrder[];
  } catch (error: any) {
    toast.error(`Error fetching sales orders: ${error.message}`);
    throw error;
  }
};

export const createSalesOrder = async (salesOrder: Omit<SalesOrder, 'id' | 'created_at' | 'updated_at'>): Promise<SalesOrder | null> => {
  try {
    const { data, error } = await supabase
      .from("sales_orders")
      .insert(salesOrder)
      .select()
      .single();
      
    if (error) throw error;
    
    toast.success(`Order ${data.order_number} has been created successfully`);
    return data as SalesOrder;
  } catch (error: any) {
    toast.error(`Error creating sales order: ${error.message}`);
    throw error;
  }
};

export const updateSalesOrder = async (id: string, updates: Partial<SalesOrder>): Promise<SalesOrder | null> => {
  try {
    const { data, error } = await supabase
      .from("sales_orders")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
      
    if (error) throw error;
    
    toast.success(`Order ${data.order_number} has been updated successfully`);
    return data as SalesOrder;
  } catch (error: any) {
    toast.error(`Error updating sales order: ${error.message}`);
    throw error;
  }
};

export const deleteSalesOrder = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("sales_orders")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
    
    toast.success("Sales order deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(`Error deleting sales order: ${error.message}`);
    throw error;
  }
};

// Products related functions
export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");
      
    if (error) throw error;
    return data as Product[];
  } catch (error: any) {
    toast.error(`Error fetching products: ${error.message}`);
    throw error;
  }
};

// Inventory related functions
export const getInventory = async (): Promise<Inventory[]> => {
  try {
    const { data, error } = await supabase
      .from("inventory")
      .select("*");
      
    if (error) throw error;
    return data as Inventory[];
  } catch (error: any) {
    toast.error(`Error fetching inventory: ${error.message}`);
    throw error;
  }
};

// Deliveries related functions
export const getDeliveries = async (orderId?: string): Promise<Delivery[]> => {
  try {
    let query = supabase.from("deliveries").select("*");
    
    if (orderId) {
      query = query.eq("order_id", orderId);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    return data as Delivery[];
  } catch (error: any) {
    toast.error(`Error fetching deliveries: ${error.message}`);
    throw error;
  }
};

// Real-time subscriptions
export const subscribeToOrders = (callback: (payload: any) => void): RealtimeChannel => {
  const channel = supabase.channel('orders-channel');
  
  channel
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'orders'
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
  
  return channel;
};

export const subscribeToSalesOrders = (callback: (payload: any) => void): RealtimeChannel => {
  const channel = supabase.channel('sales-orders-channel');
  
  channel
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'sales_orders'
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
  
  return channel;
};

// Authentication functions
export const signUp = async (email: string, password: string, userData: { full_name?: string }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) throw error;
    
    toast.success("Sign up successful. Please check your email for verification link");
    return data;
  } catch (error: any) {
    toast.error(`Sign up failed: ${error.message}`);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    toast.success("Sign in successful. Welcome back!");
    return data;
  } catch (error: any) {
    toast.error(`Sign in failed: ${error.message}`);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    toast.success("You have been successfully signed out");
    return true;
  } catch (error: any) {
    toast.error(`Sign out failed: ${error.message}`);
    throw error;
  }
};
