
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
  
  // Use the Supabase hook and destructure its return values
  const { user, loading, isAuthenticated: supabaseAuth } = useSupabaseAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug state with minimal re-renders
  useEffect(() => {
    console.log("Auth provider state:", {
      isAuthenticated,
      userRole,
      user: user ? { id: user.id } : null,
      currentPath: location.pathname,
      loading,
      supabaseAuthState: supabaseAuth
    });
  }, [isAuthenticated, userRole, user, location.pathname, loading, supabaseAuth]);
  
  // This effect handles changes from Supabase authentication state
  useEffect(() => {
    // Skip during loading
    if (loading) {
      console.log("Auth provider: still loading, skipping auth logic");
      return;
    }
    
    console.log("Auth provider: checking Supabase authentication status");
    
    // When Supabase provides user authentication information
    if (supabaseAuth && user) {
      console.log("Auth provider: detected authenticated user from Supabase");
      
      // Only update if it's a change to prevent loops
      if (!isAuthenticated) {
        console.log("Auth provider: setting isAuthenticated to true");
        setIsAuthenticated(true);
      }
      
      // Fetch user role if needed
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
      
      // Redirect away from login page when authenticated with a delay
      if (location.pathname === "/login") {
        console.log("Auth provider: on login page but authenticated, redirecting to home");
        setTimeout(() => {
          console.log("Auth provider: executing delayed navigation to home");
          navigate("/", { replace: true });
        }, 100);
      }
    } 
    // When Supabase indicates user is not authenticated
    else if (!supabaseAuth) {
      console.log("Auth provider: detected unauthenticated state from Supabase");
      
      // Only update if this is a change to prevent loops
      if (isAuthenticated) {
        console.log("Auth provider: setting isAuthenticated to false");
        setIsAuthenticated(false);
        setUserRole(null);
        setPermissions(getRolePermissions(""));
      }
      
      // Only redirect to login if not already there
      if (location.pathname !== "/login") {
        console.log("Auth provider: not on login page, redirecting to login");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 100);
      }
    }
  }, [supabaseAuth, user, loading, navigate, location.pathname, isAuthenticated]);

  // Manual login function (for mock login)
  const login = (role: string) => {
    console.log("Login called with role:", role);
    
    // Update local authentication state
    setIsAuthenticated(true);
    setUserRole(role);
    setPermissions(getRolePermissions(role));
    
    // The supabaseAuth state should update separately through the listener
    
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
    
    // Navigate with a delay
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 100);
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
