
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useSupabaseAuth hook initializing");
    
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        // First get current session
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          console.log("Initial session check:", data.session ? "Session exists" : "No session");
          
          if (data.session) {
            setSession(data.session);
            setUser(data.session.user);
          }
          
          // Only set loading to false after we've set the session
          setLoading(false);
        }
        
        // Then set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, newSession) => {
            console.log("Auth state change:", event, newSession ? "Session exists" : "No session");
            if (mounted) {
              // Only update state if it actually changed to prevent loops
              if (JSON.stringify(newSession) !== JSON.stringify(session)) {
                setSession(newSession);
                setUser(newSession?.user ?? null);
              }
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
      setLoading(true); // Prevent state changes during sign out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Successfully signed out");
      // Clear state manually to ensure consistency
      setSession(null);
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error("Error signing out:", error);
      setLoading(false);
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
