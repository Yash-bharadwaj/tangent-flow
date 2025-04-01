
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useSupabaseAuth hook initializing");
    
    // Get current session
    const initializeAuth = async () => {
      try {
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log("Auth state change:", event, session ? "Session exists" : "No session");
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );

        // THEN check for existing session
        const { data } = await supabase.auth.getSession();
        console.log("Initial session check:", data.session ? "Session exists" : "No session");
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setLoading(false);

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoading(false);
      }
    };

    initializeAuth();
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
