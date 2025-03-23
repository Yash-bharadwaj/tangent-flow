
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Expanded interface with permissions
interface UserPermissions {
  canViewModules: boolean;
  canViewSalesOrders: boolean;
  canViewInventory: boolean;
  canViewUsers: boolean;
  canViewDeliveries: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  permissions: UserPermissions;
  login: (role: string) => void;
  logout: () => void;
  hasPermission: (permission: keyof UserPermissions) => boolean;
}

// Default permissions based on role
const getRolePermissions = (role: string): UserPermissions => {
  switch (role) {
    case "superuser":
      return {
        canViewModules: true,
        canViewSalesOrders: true,
        canViewInventory: true,
        canViewUsers: true,
        canViewDeliveries: true,
      };
    case "customer":
      return {
        canViewModules: false,
        canViewSalesOrders: true,
        canViewInventory: false,
        canViewUsers: false,
        canViewDeliveries: true,
      };
    default:
      return {
        canViewModules: false,
        canViewSalesOrders: false,
        canViewInventory: false,
        canViewUsers: false,
        canViewDeliveries: false,
      };
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions>(getRolePermissions(""));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated on initial load
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole");
    
    if (storedAuth === "true" && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setPermissions(getRolePermissions(storedRole));
    } else if (location.pathname !== "/login") {
      // If not authenticated and not on login page, redirect to login
      navigate("/login");
    }
  }, [navigate, location]);

  const login = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setPermissions(getRolePermissions(role));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setPermissions(getRolePermissions(""));
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions[permission];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, permissions, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
