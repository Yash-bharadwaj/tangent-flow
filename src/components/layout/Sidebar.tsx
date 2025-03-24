import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart, 
  Box, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Layers, 
  LogOut,
  Package, 
  ShoppingCart, 
  Truck, 
  Users 
} from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { Button } from "@/components/ui/button";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ to, icon, text, isCollapsed }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 px-3 my-1 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        } ${isCollapsed ? "justify-center" : "justify-start"}`
      }
    >
      <div className="flex items-center">
        <div className={`${isCollapsed ? "mx-0" : "mr-3"}`}>{icon}</div>
        {!isCollapsed && <span className="font-medium text-sm">{text}</span>}
      </div>
    </NavLink>
  );
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, userRole, hasPermission } = useAuth();

  const navItems = [
    { 
      to: "/", 
      icon: <BarChart size={20} />, 
      text: "Dashboard",
      visible: true // Everyone can see dashboard
    },
    { 
      to: "/modules", 
      icon: <Cpu size={20} />, 
      text: "Modules",
      visible: hasPermission("canViewModules")
    },
    { 
      to: "/sales-orders", 
      icon: <ShoppingCart size={20} />, 
      text: "Sales Orders",
      visible: hasPermission("canViewSalesOrders")
    },
    { 
      to: "/inventory", 
      icon: <Package size={20} />, 
      text: "Inventory",
      visible: hasPermission("canViewInventory")
    },
    { 
      to: "/users", 
      icon: <Users size={20} />, 
      text: "Users",
      visible: hasPermission("canViewUsers")
    },
    { 
      to: "/deliveries", 
      icon: <Truck size={20} />, 
      text: "Deliveries",
      visible: hasPermission("canViewDeliveries")
    },
  ];

  const visibleNavItems = navItems.filter(item => item.visible);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        } ${className} bg-sidebar flex flex-col border-r border-sidebar-border`}
      >
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <Layers className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold tracking-tight">Tangent</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-sidebar-accent transition-colors duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-4 px-3">
          <nav className="space-y-1">
            {visibleNavItems.map((item, index) => (
              <SidebarLink
                key={index}
                to={item.to}
                icon={item.icon}
                text={item.text}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Box className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-sidebar-foreground">{userRole || "Tangent Flow"}</p>
                    <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  className="h-8 w-8"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
            {isCollapsed && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout}
                className="h-8 w-8 mx-auto"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
