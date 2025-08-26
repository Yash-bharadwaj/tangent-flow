
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Box,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Package,
  ShoppingCart,
  Truck,
  Users,
  UserCheck
} from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, userRole, hasPermission } = useAuth();
  const location = useLocation();

  const navItems = [
    { 
      to: "/", 
      icon: <BarChart size={20} />, 
      text: "Dashboard",
      visible: true
    },
    { 
      to: "/modules", 
      icon: <Box size={20} />, 
      text: "Modules",
      visible: hasPermission("manageModules") || hasPermission("canViewModules")
    },
    { 
      to: "/sales-orders", 
      icon: <ShoppingCart size={20} />, 
      text: "Sales Orders",
      visible: hasPermission("manageSalesOrders") || hasPermission("canViewSalesOrders")
    },
    { 
      to: "/business-partners", 
      icon: <UserCheck size={20} />, 
      text: "Business Partners",
      visible: true
    },
    { 
      to: "/materials", 
      icon: <Package size={20} />, 
      text: "Materials",
      visible: true
    },
    { 
      to: "/inventory", 
      icon: <Package size={20} />, 
      text: "Inventory",
      visible: hasPermission("manageInventory") || hasPermission("canViewInventory")
    },
    { 
      to: "/users", 
      icon: <Users size={20} />, 
      text: "Users",
      visible: hasPermission("manageUsers") || hasPermission("canViewUsers")
    },
    { 
      to: "/deliveries", 
      icon: <Truck size={20} />, 
      text: "Deliveries",
      visible: hasPermission("manageDeliveries") || hasPermission("canViewDeliveries")
    },
  ];

  const visibleNavItems = navItems.filter(item => item.visible);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      } bg-white/20 dark:bg-black/30 backdrop-blur-xl pattern-waves flex flex-col border-r border-black/5 dark:border-white/5 shadow-2xl`}
    >
      <div className="p-4 flex items-center">
        {!isCollapsed && (
          <div className="flex items-center">
            <Box className="h-7 w-7 text-primary" />
            <span className="ml-2 text-xl font-semibold tracking-wider premium-text-gradient">Tangent</span>
          </div>
        )}
      </div>

      <div className="overflow-y-auto flex-1 py-6 px-3">
        <nav className="space-y-1">
          {visibleNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center py-3 px-3 my-1.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-sidebar-foreground/80 hover:bg-white/10 dark:hover:bg-white/5 hover:text-sidebar-foreground"
                }`
              }
            >
              <div className="flex items-center">
                <div className={`${isCollapsed ? "mx-0" : "mr-3"}`}>{item.icon}</div>
                {!isCollapsed && <span className="font-medium text-sm tracking-wide">{item.text}</span>}
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <Box className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-sidebar-foreground">{userRole || "Tangent Flow"}</p>
                <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            className={`h-9 w-9 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 ${isCollapsed ? "mx-auto" : ""}`}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
