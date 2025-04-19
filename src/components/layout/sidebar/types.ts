
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  permission: keyof UserPermissions;
  current: boolean;
}

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
