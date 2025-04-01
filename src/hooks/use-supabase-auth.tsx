
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Separate initial session check to run only once
  useEffect(() => {
    console.log("Initial session check starting");
    
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        console.log("Initial session:", data.session ? "Session exists" : "No session");
        
        // Set initial state
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

  // Set up auth listener separately from initial check
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // This subscription handles changes to auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth event:", event);
        
        // Important: use functional updates to avoid stale state issues
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, []);

  // Memoized signIn function to authenticate with Supabase
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.log("Signing in user with Supabase:", email);
      setLoading(true);
      
      // For demo accounts that might have domain validation issues, use a workaround
      const safeEmail = email.includes('@example.com') 
        ? email.replace('@example.com', '@demo-example.com') 
        : email;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: safeEmail,
        password
      });
      
      if (error) throw error;
      
      setSession(data.session);
      setUser(data.user);
      
      console.log("User signed in successfully with Supabase");
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error("Error signing in with Supabase:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a signUp function to create new users
  const signUp = useCallback(async (email: string, password: string, userData: any = {}) => {
    try {
      console.log("Signing up user with Supabase:", email);
      setLoading(true);
      
      // For demo accounts that might have domain validation issues, use a workaround
      const safeEmail = email.includes('@example.com') 
        ? email.replace('@example.com', '@demo-example.com') 
        : email;
      
      // Important: email confirmation should now be auto-handled by our trigger
      const { data, error } = await supabase.auth.signUp({
        email: safeEmail,
        password,
        options: {
          data: userData,
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      // If we don't have a user or session, we need to sign in (auto-signin may not work)
      if (!data.session) {
        // Try to sign in immediately since our trigger should have confirmed the email
        try {
          const signInResult = await signIn(safeEmail, password);
          console.log("Auto sign-in after signup:", signInResult);
        } catch (signInError) {
          console.error("Error auto-signing in after signup:", signInError);
        }
      }
      
      console.log("User signed up successfully with Supabase");
      return data;
    } catch (error) {
      console.error("Error signing up with Supabase:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [signIn]);

  // Memoized signOut function to avoid recreating on every render
  const signOut = useCallback(async () => {
    try {
      console.log("Signing out user from Supabase");
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear state immediately on signout
      setSession(null);
      setUser(null);
      
      console.log("User signed out successfully from Supabase");
    } catch (error) {
      console.error("Error signing out from Supabase:", error);
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
