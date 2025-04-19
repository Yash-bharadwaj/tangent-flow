
import {
  LayoutDashboard,
  Settings,
  Users,
  Package2,
  Truck,
  Boxes,
} from "lucide-react";
import { NavigationItem } from "./types";

export const getNavigationItems = (pathname: string): NavigationItem[] => [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    permission: "canViewDashboard",
    current: pathname === "/",
  },
  {
    name: "Modules",
    href: "/modules",
    icon: Boxes,
    permission: "canViewModules",
    current: pathname === "/modules",
  },
  {
    name: "User Management",
    href: "/users",
    icon: Users,
    permission: "canManageUsers",
    current: pathname === "/users",
  },
  {
    name: "Sales Orders",
    href: "/sales-orders",
    icon: Package2,
    permission: "canViewSalesOrders",
    current: pathname === "/sales-orders",
  },
  {
    name: "Business Partners",
    href: "/business-partners",
    icon: Users,
    permission: "canViewBusinessPartners",
    current: pathname === "/business-partners",
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Boxes,
    permission: "canViewInventory",
    current: pathname === "/inventory",
  },
  {
    name: "Delivery Tracking",
    href: "/deliveries",
    icon: Truck,
    permission: "canViewDeliveries",
    current: pathname === "/deliveries",
  },
];
