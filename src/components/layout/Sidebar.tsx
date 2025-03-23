
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart, 
  Box, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Layers, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users 
} from "lucide-react";

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

  const navItems = [
    { to: "/", icon: <BarChart size={20} />, text: "Dashboard" },
    { to: "/modules", icon: <Cpu size={20} />, text: "Modules" },
    { to: "/sales-orders", icon: <ShoppingCart size={20} />, text: "Sales Orders" },
    { to: "/inventory", icon: <Package size={20} />, text: "Inventory" },
    { to: "/users", icon: <Users size={20} />, text: "Users" },
    { to: "/deliveries", icon: <Truck size={20} />, text: "Deliveries" },
  ];

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20 -translate-x-0" : "-translate-x-0"
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
            {navItems.map((item, index) => (
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
          <div className="flex items-center">
            {!isCollapsed && (
              <>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Box className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-sidebar-foreground">Tangent Flow</p>
                  <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
