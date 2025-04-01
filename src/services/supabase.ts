
import { supabase } from "@/integrations/supabase/client";
import { Profile, Order, Product, Inventory, Delivery } from "@/types/database";
import { toast } from "@/hooks/use-toast";
import { RealtimeChannel } from "@supabase/supabase-js";

// Mock data functions until tables are created in Supabase
export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    // This is a mock implementation until the profiles table exists
    console.log("Getting profile for user:", userId);
    return {
      id: userId,
      full_name: "Demo User",
      avatar_url: null,
      role: "customer",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
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
    // This is a mock implementation until the profiles table exists
    console.log("Updating profile for user:", userId, updates);
    return {
      id: userId,
      full_name: updates.full_name || "Demo User",
      avatar_url: updates.avatar_url || null,
      role: updates.role || "customer",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
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
    // This is a mock implementation until the orders table exists
    console.log("Getting orders for user:", userId);
    return [
      {
        id: "1",
        user_id: userId,
        status: "Processing",
        total_amount: 129.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        user_id: userId,
        status: "Shipped",
        total_amount: 79.95,
        created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  } catch (error: any) {
    toast({
      title: "Error fetching orders",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

// Products related functions
export const getProducts = async (): Promise<Product[]> => {
  try {
    // This is a mock implementation until the products table exists
    return [
      {
        id: "1",
        name: "Ergonomic Chair",
        description: "Comfortable office chair with lumbar support",
        price: 199.99,
        stock: 15,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        name: "Standing Desk",
        description: "Adjustable height desk for better posture",
        price: 349.99,
        stock: 8,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
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
    // This is a mock implementation until the inventory table exists
    return [
      {
        id: "1",
        product_id: "1",
        quantity: 15,
        location: "Warehouse A",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        product_id: "2",
        quantity: 8,
        location: "Warehouse B",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
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
    // This is a mock implementation until the deliveries table exists
    let deliveries = [
      {
        id: "1",
        order_id: "1",
        status: "In Transit",
        tracking_number: "TRK123456789",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        order_id: "2",
        status: "Delivered",
        tracking_number: "TRK987654321",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    
    if (orderId) {
      deliveries = deliveries.filter(delivery => delivery.order_id === orderId);
    }
    
    return deliveries;
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
  // This is a mock implementation for real-time updates
  const channel = supabase.channel('orders-channel');
  
  setTimeout(() => {
    // Simulate a real-time update after 5 seconds
    callback({
      eventType: 'INSERT',
      new: {
        id: "3",
        user_id: userId,
        status: "Processing",
        total_amount: 59.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    });
  }, 5000);
  
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
