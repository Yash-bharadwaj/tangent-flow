
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js"; 
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { getProfile } from "@/services/supabase";
import { toast } from "sonner";
import { signOut as supabaseSignOut } from "@/services/supabase";

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
  const { user, signOut, loading } = useSupabaseAuth(); // Get user, signOut and loading from Supabase hook
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Auth provider state:", { isAuthenticated, userRole, user, currentPath: location.pathname });

  useEffect(() => {
    // Only proceed when loading is false (authentication state is determined)
    if (loading) return;
    
    // Check if user is authenticated based on Supabase user
    if (user) {
      console.log("User authenticated:", user.id);
      setIsAuthenticated(true);
      
      // Fetch user role from profiles table
      const fetchUserRole = async () => {
        try {
          const profile = await getProfile(user.id);
          const role = profile?.role || 'customer';
          console.log("User role fetched:", role);
          setUserRole(role);
          setPermissions(getRolePermissions(role));
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // Default to customer role if profile fetch fails
          setUserRole('customer');
          setPermissions(getRolePermissions('customer'));
        }
      };
      
      fetchUserRole();
      
      // Redirect to home if on login page
      if (location.pathname === "/login") {
        navigate("/");
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setPermissions(getRolePermissions(""));
      
      // Only redirect to login if not already on login page
      if (location.pathname !== "/login") {
        console.log("Not authenticated, redirecting to login");
        navigate("/login");
      }
    }
  }, [user, loading, navigate, location.pathname]);

  const login = (role: string) => {
    console.log("Login called with role:", role);
    // This function is kept for backward compatibility
    // The actual authentication is now handled by Supabase
    setIsAuthenticated(true);
    setUserRole(role);
    setPermissions(getRolePermissions(role));
    
    // Navigate to the home page after login
    navigate("/");
  };

  const logout = async () => {
    console.log("Logout called");
    // Call the Supabase signOut function
    await supabaseSignOut();
    // The rest will be handled by the auth state change listener
    // But we'll clear the state explicitly as well
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
