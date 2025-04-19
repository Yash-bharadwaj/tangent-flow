
import { User } from "@supabase/supabase-js";

// Extended User type with profile information
export interface UserWithProfile extends User {
  full_name?: string | null;
  avatar_url?: string | null;
  role?: string | null;
}

export interface AuthContextType {
  user: UserWithProfile | null;
  session: any | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<void>;
  userRole?: string | null;
  hasPermission?: (permission: keyof UserPermissions) => boolean;
  permissions?: UserPermissions;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, userData?: any) => Promise<any>;
  logout: () => Promise<void>;
}

// Define user permissions interface
export interface UserPermissions {
  canViewDashboard: boolean;
  canViewModules: boolean;
  canManageUsers: boolean;
  canViewSalesOrders: boolean;
  canViewInventory: boolean;
  canViewDeliveries: boolean;
  canViewBusinessPartners: boolean;
  canManageBusinessPartners: boolean;
}

// Function to get role permissions based on user role
export const getRolePermissions = (role: string | null): UserPermissions => {
  // Default permissions for unauthenticated users
  if (!role) {
    return {
      canViewDashboard: false,
      canViewModules: false,
      canManageUsers: false,
      canViewSalesOrders: false,
      canViewInventory: false,
      canViewDeliveries: false,
      canViewBusinessPartners: false,
      canManageBusinessPartners: false
    };
  }

  // Admin has all permissions
  if (role === 'admin') {
    return {
      canViewDashboard: true,
      canViewModules: true,
      canManageUsers: true,
      canViewSalesOrders: true,
      canViewInventory: true,
      canViewDeliveries: true,
      canViewBusinessPartners: true,
      canManageBusinessPartners: true
    };
  }

  // Default permissions for standard users (e.g., 'customer' role)
  return {
    canViewDashboard: true,
    canViewModules: true,
    canManageUsers: false, // Regular users can't manage other users
    canViewSalesOrders: true,
    canViewInventory: true,
    canViewDeliveries: true,
    canViewBusinessPartners: true,
    canManageBusinessPartners: false // Regular users can't manage business partners
  };
};
