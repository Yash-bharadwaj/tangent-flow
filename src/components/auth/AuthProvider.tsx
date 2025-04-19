
import { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js"; 
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { fetchUserRole, logAuthState, ensureUserProfile } from "@/utils/authUtils";
import { UserPermissions, getRolePermissions } from "@/types/auth";
import AuthContext from "@/contexts/AuthContext";
import { toast } from "sonner";
import { initializeDemoUsers } from "@/services/supabase";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions>(getRolePermissions(""));
  
  // Use the Supabase hook and destructure its return values
  const { user, loading, isAuthenticated: supabaseAuth, signIn, signOut, signUp } = useSupabaseAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize demo users when the app starts
  useEffect(() => {
    if (!loading) {
      console.log("Initializing demo users...");
      initializeDemoUsers()
        .then(() => console.log("Demo users initialization complete"))
        .catch(err => console.error("Failed to initialize demo users:", err));
    }
  }, [loading]);
  
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
        
        // Ensure user profile exists
        const userData = user.user_metadata || {};
        ensureUserProfile(
          user.id, 
          userData.role || 'customer', 
          userData.full_name || ''
        );
        
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
      
      if (isAuthenticated) {
        console.log("Auth provider: setting isAuthenticated to false");
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

  // Handle login with Supabase
  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", email);
      
      // Always use the email domain workaround for demo accounts
      const modifiedEmail = email.includes('@example.com') 
        ? email.replace('@example.com', '@demo-example.com') 
        : email;
        
      console.log("Using modified email for login:", modifiedEmail);
      
      // signIn now returns { user, session }
      const result = await signIn(modifiedEmail, password);
      
      toast.success("Logged in successfully");
      return result;
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  // Add register function to create new users
  const register = async (email: string, password: string, userData: any = {}) => {
    try {
      console.log("Attempting to register:", email, userData);
      
      // Always use the email domain workaround for demo accounts
      const modifiedEmail = email.includes('@example.com') 
        ? email.replace('@example.com', '@demo-example.com') 
        : email;
      
      console.log("Using modified email for registration:", modifiedEmail);
        
      const result = await signUp(modifiedEmail, password, userData);
      
      // Create profile immediately after signup
      if (result?.user) {
        await ensureUserProfile(
          result.user.id,
          userData.role || 'customer',
          userData.full_name || ''
        );
      }
      
      toast.success("Registration successful");
      return result;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  // Handle logout with Supabase
  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUserRole(null);
      setPermissions(getRolePermissions(""));
      
      toast.info("Logged out successfully");
      
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 300);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Logout failed");
    }
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
      register,
      logout,
      hasPermission,
      signIn,
      signOut,
      signUp,
      loading,
      session: null
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Re-export the useAuth hook from the context
export { useAuth } from "@/contexts/AuthContext";
