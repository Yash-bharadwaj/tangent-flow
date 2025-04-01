
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial session check
  useEffect(() => {
    console.log("Initial session check starting");
    
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Initial session:", data.session ? "Session exists" : "No session");
        
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error("Error getting initial session:", error);
        setLoading(false);
      }
    };

    getInitialSession();
  }, []);

  // Set up auth listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth event:", event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    return () => {
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, []);

  // Simple sign in function without email domain transformations
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.log("Signing in user:", email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      setSession(data.session);
      setUser(data.user);
      
      console.log("User signed in successfully");
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Simple sign up function 
  const signUp = useCallback(async (email: string, password: string, userData: any = {}) => {
    try {
      console.log("Signing up user:", email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      console.log("User signed up successfully");
      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Simple sign out function
  const signOut = useCallback(async () => {
    try {
      console.log("Signing out user");
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setSession(null);
      setUser(null);
      
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!session,
  };
};

export default useSupabaseAuth;
