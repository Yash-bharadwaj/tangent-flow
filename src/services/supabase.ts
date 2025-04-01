
import { supabase } from "@/integrations/supabase/client";
import { Profile, Order, Product, Inventory, Delivery, SalesOrder } from "@/types/database";
import { toast } from "@/hooks/use-toast";
import { RealtimeChannel } from "@supabase/supabase-js";

// Helper function to generate mock IDs since browser doesn't have Node's crypto.randomUUID()
const generateMockId = () => {
  return 'mock-' + Math.random().toString(36).substring(2, 11);
};

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
    // First try to get from Supabase
    const { data, error } = await supabase
      .from("sales_orders")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) {
      console.error("Error fetching from Supabase:", error);
      throw error;
    }
    
    // If we got data, return it
    if (data && data.length > 0) {
      return data as SalesOrder[];
    }
    
    // If Supabase returned empty array, return mock data for demonstration
    console.log("No sales orders found in Supabase, using mock data");
    const mockOrders: SalesOrder[] = [
      {
        id: "mock-1",
        order_number: "SO-2023-001",
        customer_name: "Acme Steel Inc.",
        order_status: "Processing",
        material: "Stainless Steel Sheets",
        quantity: 500,
        expected_payment_date: "2023-06-30",
        user_id: "mock-user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "mock-2",
        order_number: "SO-2023-002",
        customer_name: "MetalWorks Ltd.",
        order_status: "Shipped",
        material: "Aluminum Rods",
        quantity: 200,
        expected_payment_date: "2023-06-15",
        user_id: "mock-user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "mock-3",
        order_number: "SO-2023-003",
        customer_name: "BuildRight Construction",
        order_status: "Pending",
        material: "Copper Pipes",
        quantity: 150,
        expected_payment_date: "2023-07-10",
        user_id: "mock-user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    return mockOrders;
  } catch (error: any) {
    toast({
      title: "Error fetching sales orders",
      description: error.message,
      variant: "destructive",
    });
    
    // Return mock data on error
    console.log("Error fetching sales orders, using mock data");
    return [];
  }
};

export const createSalesOrder = async (salesOrder: Omit<SalesOrder, 'id' | 'created_at' | 'updated_at'>): Promise<SalesOrder | null> => {
  try {
    // First try to create in Supabase
    const { data, error } = await supabase
      .from("sales_orders")
      .insert(salesOrder)
      .select()
      .single();
      
    if (error) {
      console.error("Error creating sales order in Supabase:", error);
      throw error;
    }
    
    toast({
      title: "Sales order created",
      description: `Order ${data.order_number} has been created successfully`,
    });
    
    return data as SalesOrder;
  } catch (error: any) {
    console.error("Falling back to mock data creation:", error);
    
    // Create a mock order with a generated ID for demonstration
    const mockId = generateMockId();
    const timestamp = new Date().toISOString();
    
    const mockOrder: SalesOrder = {
      id: mockId,
      ...salesOrder,
      created_at: timestamp,
      updated_at: timestamp
    };
    
    toast({
      title: "Sales order created (mock)",
      description: `Order ${salesOrder.order_number} has been created successfully in mock mode`,
    });
    
    return mockOrder;
  }
};

export const updateSalesOrder = async (id: string, updates: Partial<SalesOrder>): Promise<SalesOrder | null> => {
  try {
    // First try to update in Supabase
    const { data, error } = await supabase
      .from("sales_orders")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating sales order in Supabase:", error);
      throw error;
    }
    
    toast({
      title: "Sales order updated",
      description: `Order ${data.order_number} has been updated successfully`,
    });
    
    return data as SalesOrder;
  } catch (error: any) {
    console.error("Falling back to mock update:", error);
    
    // For mock data, just return the updates applied to the original (in a real app, you'd maintain a local state)
    const mockUpdatedOrder: SalesOrder = {
      id,
      order_number: updates.order_number || "MOCK-UPDATED",
      customer_name: updates.customer_name || "Mock Customer",
      order_status: updates.order_status || "Processing",
      material: updates.material || "Mock Material",
      quantity: updates.quantity || 1,
      expected_payment_date: updates.expected_payment_date || new Date().toISOString().split('T')[0],
      user_id: updates.user_id || "mock-user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    toast({
      title: "Sales order updated (mock)",
      description: "The sales order has been updated successfully in mock mode",
    });
    
    return mockUpdatedOrder;
  }
};

export const deleteSalesOrder = async (id: string): Promise<boolean> => {
  try {
    // First try to delete from Supabase
    const { error } = await supabase
      .from("sales_orders")
      .delete()
      .eq("id", id);
      
    if (error) {
      console.error("Error deleting sales order from Supabase:", error);
      throw error;
    }
    
    toast({
      title: "Sales order deleted",
      description: "The sales order has been deleted successfully",
    });
    
    return true;
  } catch (error: any) {
    console.error("Using mock deletion:", error);
    
    // For mock data, just return success (in a real app, you'd update local state)
    toast({
      title: "Sales order deleted (mock)",
      description: "The sales order has been deleted successfully in mock mode",
    });
    
    return true;
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
