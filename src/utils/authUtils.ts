
import { getProfile } from "@/services/supabase";
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
