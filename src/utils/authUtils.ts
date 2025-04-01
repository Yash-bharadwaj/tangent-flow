
import { getProfile } from "@/services/supabase";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getRolePermissions } from "@/types/auth";

// Fetch user role from the profile
export const fetchUserRole = async (userId: string) => {
  try {
    const profile = await getProfile(userId);
    return profile?.role || 'customer';
  } catch (error) {
    console.error("Error fetching user profile:", error);
    toast.error("Could not fetch user profile");
    // Default to customer role if profile fetch fails
    return 'customer';
  }
};

// Create or update profile if it doesn't exist
export const ensureUserProfile = async (userId: string, role = 'customer', fullName = '') => {
  try {
    // First check if profile exists
    const existingProfile = await getProfile(userId);
    
    if (!existingProfile) {
      // Create profile if it doesn't exist - ensure we pass a single object, not an array
      const { data, error } = await supabase
        .from('profiles')
        .insert({ 
          id: userId, 
          role, 
          full_name: fullName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      console.log("Created new user profile:", data);
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring user profile:", error);
    return false;
  }
};

// Debug helper for auth state
export const logAuthState = (state: {
  isAuthenticated: boolean;
  userRole: string | null;
  user: any;
  currentPath: string;
  loading: boolean;
  supabaseAuthState: boolean;
}) => {
  console.log("Auth provider state:", state);
};
