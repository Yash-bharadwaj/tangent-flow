import { supabase } from "@/integrations/supabase/client";
import { Profile, Order, SalesOrder, Product, Inventory, Delivery } from "@/types/database";
import { toast } from "sonner";
import { ensureUserProfile } from "@/utils/authUtils";
import { RealtimeChannel } from "@supabase/supabase-js";

// Profile related functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    console.log("Fetching profile for user:", userId);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
      
    if (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
    
    console.log("Profile data:", data);
    return data as Profile;
  } catch (error: any) {
    console.error(`Error fetching profile: ${error.message}`);
    return null;
  }
};

export const createProfile = async (profile: Partial<Profile> & { id: string }): Promise<Profile | null> => {
  try {
    console.log("Creating profile:", profile);
    // First check if the profile already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", profile.id)
      .single();
      
    if (existingProfile) {
      // If the profile exists, just return it
      return existingProfile as Profile;
    }
    
    // Insert new profile - ensuring we pass a single object, not an array
    const { data, error } = await supabase
      .from("profiles")
      .insert(profile)
      .select()
      .single();
      
    if (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
    
    console.log("Created profile:", data);
    return data as Profile;
  } catch (error: any) {
    console.error(`Error creating profile: ${error.message}`);
    return null;
  }
};

// Initialize demo users (call this once during app startup)
export const initializeDemoUsers = async () => {
  // For testing purposes, we'll just log that this function was called
  console.log("initializeDemoUsers function called - users should already exist in the database");
  return true;
};

// Authentication functions
export const signIn = async (email: string, password: string) => {
  try {
    console.log("Signing in user:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Sign in error:", error);
      throw error;
    }
    
    console.log("Sign in successful:", data);
    
    // Ensure profile exists
    if (data.user) {
      const userData = data.user.user_metadata || {};
      await ensureUserProfile(
        data.user.id, 
        userData.role || 'customer', 
        userData.full_name || ''
      );
    }
    
    toast.success("Sign in successful. Welcome back!");
    return data;
  } catch (error: any) {
    console.error("Sign in error details:", error);
    toast.error(`Sign in failed: ${error.message}`);
    throw error;
  }
};

export const signUp = async (email: string, password: string, userData: { full_name?: string, role?: string }) => {
  try {
    console.log("Signing up user:", email, userData);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: window.location.origin
      }
    });
    
    if (error) {
      console.error("Sign up error:", error);
      throw error;
    }
    
    console.log("Sign up successful:", data);
    
    // Create profile for the new user
    if (data.user) {
      await createProfile({
        id: data.user.id,
        full_name: userData.full_name || '',
        role: userData.role || 'customer',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    toast.success("Sign up successful");
    return data;
  } catch (error: any) {
    toast.error(`Sign up failed: ${error.message}`);
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

// Get orders for a specific user
export const getOrdersForUser = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data as Order[];
  } catch (error: any) {
    toast.error(`Error fetching user orders: ${error.message}`);
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

// Get sales orders for a specific user
export const getSalesOrdersForUser = async (userId: string): Promise<SalesOrder[]> => {
  try {
    const { data, error } = await supabase
      .from("sales_orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data as SalesOrder[];
  } catch (error: any) {
    toast.error(`Error fetching user sales orders: ${error.message}`);
    throw error;
  }
};

type CreateSalesOrderInput = {
  order_number: string;
  customer_name: string;
  order_status: string;
  material: string;
  quantity: number;
  expected_payment_date: string;
  user_id?: string;
};

export const createSalesOrder = async (salesOrder: CreateSalesOrderInput): Promise<SalesOrder | null> => {
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

// Get deliveries for a specific user
export const getDeliveriesForUser = async (userId: string): Promise<Delivery[]> => {
  try {
    // Get the user's orders first
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", userId);
      
    if (ordersError) throw ordersError;
    
    if (!orders.length) return [];
    
    // Get deliveries for the user's orders
    const orderIds = orders.map(order => order.id);
    const { data, error } = await supabase
      .from("deliveries")
      .select("*")
      .in("order_id", orderIds);
      
    if (error) throw error;
    return data as Delivery[];
  } catch (error: any) {
    toast.error(`Error fetching user deliveries: ${error.message}`);
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
