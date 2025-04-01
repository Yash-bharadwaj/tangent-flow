
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
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";

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
        `flex items-center py-3 px-3 my-1.5 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg shadow-primary/20"
            : "text-sidebar-foreground/80 hover:bg-white/10 dark:hover:bg-white/5 hover:text-sidebar-foreground"
        } ${isCollapsed ? "justify-center" : "justify-start"}`
      }
    >
      <div className="flex items-center">
        <div className={`${isCollapsed ? "mx-0" : "mr-3"}`}>{icon}</div>
        {!isCollapsed && <span className="font-medium text-sm tracking-wide">{text}</span>}
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
        className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-20" : "w-72"
        } ${className} bg-white/20 dark:bg-black/30 backdrop-blur-xl pattern-waves flex flex-col border-r border-black/5 dark:border-white/5 shadow-2xl`}
      >
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <Layers className="h-7 w-7 text-primary" />
              <span className="ml-2 text-xl font-semibold tracking-wider premium-text-gradient">Tangent</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg border border-black/5 dark:border-white/10 backdrop-blur-lg 
                     bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-white/5 transition-all duration-300"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-6 px-3">
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

        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <>
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Box className="h-5 w-5 text-primary" />
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
                  className="h-9 w-9 rounded-lg hover:bg-white/10 dark:hover:bg-white/5"
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
                className="h-9 w-9 mx-auto rounded-lg hover:bg-white/10 dark:hover:bg-white/5"
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
