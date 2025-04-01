
import { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js"; 
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { signOut as supabaseSignOut } from "@/services/supabase";
import { UserPermissions, getRolePermissions } from "@/types/auth";
import AuthContext from "@/contexts/AuthContext";
import { fetchUserRole, logAuthState } from "@/utils/authUtils";
import { toast } from "sonner";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions>(getRolePermissions(""));
  
  // Use the Supabase hook and destructure its return values
  const { user, loading, isAuthenticated: supabaseAuth, signOut: supabaseAuthSignOut } = useSupabaseAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug state with minimal re-renders
  useEffect(() => {
    logAuthState({
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
        
        // Fetch user role if needed
        fetchUserRole(user.id).then(role => {
          console.log("User role fetched:", role);
          setUserRole(role);
          setPermissions(getRolePermissions(role));
        });
      }
    }
    // When Supabase indicates user is not authenticated
    else if (!supabaseAuth && !loading) {
      console.log("Auth provider: detected unauthenticated state from Supabase");
      
      // Only update if mock login is not active
      if (isAuthenticated && !userRole) {
        console.log("Auth provider: setting isAuthenticated to false (no mock active)");
        setIsAuthenticated(false);
        setUserRole(null);
        setPermissions(getRolePermissions(""));
      }
    }
    
    // Handle routing based on authentication state
    handleRouting();
  }, [supabaseAuth, user, loading, isAuthenticated, userRole, location.pathname]);
  
  // Separated routing logic for clarity
  const handleRouting = () => {
    // Don't redirect during loading to prevent flashes
    if (loading) return;
    
    // If authenticated, redirect from login page to home
    if (isAuthenticated && location.pathname === "/login") {
      console.log("Auth provider: on login page but authenticated, redirecting to home");
      setTimeout(() => {
        console.log("Auth provider: executing delayed navigation to home");
        navigate("/", { replace: true });
      }, 300);
    } 
    // If not authenticated and not on login page, redirect to login
    else if (!isAuthenticated && location.pathname !== "/login") {
      console.log("Auth provider: not on login page but unauthenticated, redirecting to login");
      setTimeout(() => {
        console.log("Auth provider: executing delayed navigation to login");
        navigate("/login", { replace: true });
      }, 300);
    }
  };

  // Manual login function (for mock login)
  const login = (role: string) => {
    console.log("Login called with role:", role);
    
    // Update local authentication state
    setIsAuthenticated(true);
    setUserRole(role);
    setPermissions(getRolePermissions(role));
    
    toast.success(`Logged in successfully as ${role}`);
    
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
    
    // Then sign out from Supabase if we were using it
    if (supabaseAuth) {
      await supabaseAuthSignOut();
    }
    
    toast.info("Logged out successfully");
    
    // Navigate with a delay
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 300);
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

// Re-export the useAuth hook from the context
export { useAuth } from "@/contexts/AuthContext";
