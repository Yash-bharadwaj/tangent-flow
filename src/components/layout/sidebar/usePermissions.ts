
import { useAuth } from "../../auth/AuthProvider";
import { UserPermissions } from "./types";

export const useUserPermissions = (): UserPermissions => {
  const { user } = useAuth();
  
  // Default permissions - very permissive for now
  return {
    canViewDashboard: true,
    canViewModules: true,
    canManageUsers: true,
    canViewSalesOrders: true,
    canViewInventory: true,
    canViewDeliveries: true,
    canViewBusinessPartners: true,
    canManageBusinessPartners: true,
  };
};
