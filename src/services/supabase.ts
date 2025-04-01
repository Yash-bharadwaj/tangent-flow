import { supabase } from "@/integrations/supabase/client";
import { Profile, Order, Product, Inventory, Delivery, SalesOrder } from "@/types/database";
import { toast } from "@/hooks/use-toast";
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
    toast({
      title: "Error fetching profile",
      description: error.message,
      variant: "destructive",
    });
    return null;
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
    return data as Profile;
  } catch (error: any) {
    toast({
      title: "Error updating profile",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

// Orders related functions
export const getOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId);
      
    if (error) throw error;
    return data as Order[];
  } catch (error: any) {
    toast({
      title: "Error fetching orders",
      description: error.message,
      variant: "destructive",
    });
    return [];
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
    toast({
      title: "Error fetching sales orders",
      description: error.message,
      variant: "destructive",
    });
    return [];
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
    
    toast({
      title: "Sales order created",
      description: `Order ${data.order_number} has been created successfully`,
    });
    
    return data as SalesOrder;
  } catch (error: any) {
    toast({
      title: "Error creating sales order",
      description: error.message,
      variant: "destructive",
    });
    return null;
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
    
    toast({
      title: "Sales order updated",
      description: `Order ${data.order_number} has been updated successfully`,
    });
    
    return data as SalesOrder;
  } catch (error: any) {
    toast({
      title: "Error updating sales order",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const deleteSalesOrder = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("sales_orders")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
    
    toast({
      title: "Sales order deleted",
      description: "The sales order has been deleted successfully",
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting sales order",
      description: error.message,
      variant: "destructive",
    });
    return false;
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
    toast({
      title: "Error fetching products",
      description: error.message,
      variant: "destructive",
    });
    return [];
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
    toast({
      title: "Error fetching inventory",
      description: error.message,
      variant: "destructive",
    });
    return [];
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
    toast({
      title: "Error fetching deliveries",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

// Real-time subscriptions
export const subscribeToOrders = (userId: string, callback: (payload: any) => void): RealtimeChannel => {
  const channel = supabase.channel('orders-channel');
  
  channel
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'orders',
      filter: `user_id=eq.${userId}`
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
    
    toast({
      title: "Sign up successful",
      description: "Please check your email for verification link",
    });
    
    return data;
  } catch (error: any) {
    toast({
      title: "Sign up failed",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    toast({
      title: "Sign in successful",
      description: "Welcome back!",
    });
    
    return data;
  } catch (error: any) {
    toast({
      title: "Sign in failed",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Sign out failed",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};
