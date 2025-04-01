
import { supabase } from "@/integrations/supabase/client";
import { Profile, Order, Product, Inventory, Delivery } from "@/types/database";
import { toast } from "@/hooks/use-toast";

// User profile related functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
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
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
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
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
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
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
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
      .from('inventory')
      .select('*, products(*)');
    
    if (error) throw error;
    return data || [];
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
    let query = supabase
      .from('deliveries')
      .select('*');
    
    if (orderId) {
      query = query.eq('order_id', orderId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
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
export const subscribeToOrders = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('orders-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe();
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
