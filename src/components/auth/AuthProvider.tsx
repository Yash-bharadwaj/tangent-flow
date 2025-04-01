
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions>(getRolePermissions(""));
  const { user, loading } = useSupabaseAuth(); // Get user and loading from Supabase hook
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug state
  useEffect(() => {
    const debugState = {
      isAuthenticated,
      userRole,
      user: user ? { id: user.id } : null,
      currentPath: location.pathname,
      loading
    };
    console.log("Auth provider state:", debugState);
  }, [isAuthenticated, userRole, user, location.pathname, loading]);
  
  // This effect handles user authentication state and navigation
  useEffect(() => {
    // Skip navigation logic during loading
    if (loading) {
      console.log("Auth loading, skipping navigation logic");
      return;
    }
    
    console.log("Auth no longer loading, checking authentication status");
    
    // Handle authenticated user
    if (user) {
      console.log("User authenticated:", user.id);
      
      // Set authenticated state only if changing
      if (!isAuthenticated) {
        console.log("Setting isAuthenticated to true");
        setIsAuthenticated(true);
      }
      
      // Fetch user role only if not already set
      if (!userRole) {
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
      }
      
      // Only redirect if we're on the login page
      if (location.pathname === "/login") {
        console.log("On login page but authenticated, redirecting to home");
        // Use a 100ms delay to ensure all state updates are processed
        const navigationTimer = setTimeout(() => {
          console.log("Executing delayed navigation to home");
          navigate("/", { replace: true });
        }, 100);
        
        return () => clearTimeout(navigationTimer);
      }
    } 
    // Handle unauthenticated user
    else {
      console.log("No user, setting unauthenticated state");
      
      // Clear authentication state
      if (isAuthenticated) {
        console.log("Setting isAuthenticated to false");
        setIsAuthenticated(false);
        setUserRole(null);
        setPermissions(getRolePermissions(""));
      }
      
      // Only redirect to login if not already on login page
      if (location.pathname !== "/login") {
        console.log("Not authenticated, redirecting to login");
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, navigate, location.pathname]);

  // Manual login function (for mock login)
  const login = (role: string) => {
    console.log("Login called with role:", role);
    
    // Update authentication state
    setIsAuthenticated(true);
    setUserRole(role);
    setPermissions(getRolePermissions(role));
    
    // Navigate to home page with delay to ensure state updates
    console.log("Scheduling navigation to home after login");
    setTimeout(() => {
      console.log("Executing navigation to home after login");
      navigate("/", { replace: true });
    }, 500);
  };

  // Logout function
  const logout = async () => {
    console.log("Logout called");
    
    // Clear state first to prevent flash of authenticated content
    setIsAuthenticated(false);
    setUserRole(null);
    setPermissions(getRolePermissions(""));
    
    // Then sign out from Supabase
    await supabaseSignOut();
    
    // Navigate to login page with replace to prevent back navigation
    navigate("/login", { replace: true });
  };

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions[permission];
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      permissions, 
      user, 
      login, 
      logout, 
      hasPermission 
    }}>
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
