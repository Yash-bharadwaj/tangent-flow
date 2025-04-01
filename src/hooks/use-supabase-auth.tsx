
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useSupabaseAuth hook initializing");
    
    // Initialize auth state - use a flag to prevent duplicate state updates
    let mounted = true;
    
    // Get current session
    const initializeAuth = async () => {
      try {
        // First get current session (do this first to prevent flash of unauthenticated state)
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          console.log("Initial session check:", data.session ? "Session exists" : "No session");
          setSession(data.session);
          setUser(data.session?.user ?? null);
          setLoading(false);
        }
        
        // Then set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, newSession) => {
            console.log("Auth state change:", event, newSession ? "Session exists" : "No session");
            if (mounted) {
              setSession(newSession);
              setUser(newSession?.user ?? null);
              setLoading(false);
            }
          }
        );

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Add signOut method
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Successfully signed out");
      // Session will be updated by the onAuthStateChange listener
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    user,
    session,
    loading,
    signOut,
  };
};

export default useSupabaseAuth;
