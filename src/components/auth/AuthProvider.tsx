import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js"; 
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { getProfile } from "@/services/supabase";

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
  user: User | null;
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
  const { user } = useSupabaseAuth(); // Get user from Supabase hook
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated based on Supabase user
    if (user) {
      setIsAuthenticated(true);
      
      // Fetch user role from profiles table
      const fetchUserRole = async () => {
        const profile = await getProfile(user.id);
        const role = profile?.role || 'customer';
        setUserRole(role);
        setPermissions(getRolePermissions(role));
      };
      
      fetchUserRole();
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setPermissions(getRolePermissions(""));
      
      // If not authenticated and not on login page, redirect to login
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [user, navigate, location]);

  const login = (role: string) => {
    // This function is kept for backward compatibility
    // The actual authentication is now handled by Supabase
    setIsAuthenticated(true);
    setUserRole(role);
    setPermissions(getRolePermissions(role));
  };

  const logout = () => {
    // This now should call the Supabase signOut function
    // But we keep the function for compatibility
    setIsAuthenticated(false);
    setUserRole(null);
    setPermissions(getRolePermissions(""));
    navigate("/login");
  };

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions[permission];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, permissions, user, login, logout, hasPermission }}>
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
