
import { User } from "@supabase/supabase-js";

export interface UserPermissions {
  viewDashboard: boolean;
  manageUsers: boolean;
  manageModules: boolean;
  manageSalesOrders: boolean;
  manageInventory: boolean;
  manageDeliveries: boolean;
  // Add these fields to match what's used in Sidebar.tsx
  canViewModules: boolean;
  canViewSalesOrders: boolean;
  canViewInventory: boolean;
  canViewUsers: boolean;
  canViewDeliveries: boolean;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  permissions: UserPermissions;
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  hasPermission: (permission: keyof UserPermissions) => boolean;
}

// Available roles and their permissions
type RolePermissionsMap = {
  [key: string]: UserPermissions;
};

// Define default permissions for each role
const defaultPermissions: UserPermissions = {
  viewDashboard: false,
  manageUsers: false,
  manageModules: false,
  manageSalesOrders: false,
  manageInventory: false,
  manageDeliveries: false,
  // Add the new permission fields
  canViewModules: false,
  canViewSalesOrders: false,
  canViewInventory: false,
  canViewUsers: false,
  canViewDeliveries: false,
};

// Define permissions for each role
const rolePermissions: RolePermissionsMap = {
  // Admin has all permissions
  "admin": {
    viewDashboard: true,
    manageUsers: true,
    manageModules: true,
    manageSalesOrders: true,
    manageInventory: true,
    manageDeliveries: true,
    canViewModules: true,
    canViewSalesOrders: true,
    canViewInventory: true,
    canViewUsers: true,
    canViewDeliveries: true,
  },
  // Customer has limited permissions
  "customer": {
    viewDashboard: true,
    manageUsers: false,
    manageModules: false,
    manageSalesOrders: true,
    manageInventory: false,
    manageDeliveries: true,
    canViewModules: false,
    canViewSalesOrders: true,
    canViewInventory: false,
    canViewUsers: false,
    canViewDeliveries: true,
  },
  // Default user with minimal permissions
  "user": {
    viewDashboard: true,
    manageUsers: false,
    manageModules: false,
    manageSalesOrders: false,
    manageInventory: false,
    manageDeliveries: false,
    canViewModules: false,
    canViewSalesOrders: false,
    canViewInventory: false,
    canViewUsers: false,
    canViewDeliveries: false,
  },
};

// Helper function to get permissions for a given role
export const getRolePermissions = (role: string | null): UserPermissions => {
  if (!role) return defaultPermissions;
  return rolePermissions[role] || defaultPermissions;
};
