
import { User } from "@supabase/supabase-js";

// Extended User type with profile information
export interface UserWithProfile extends User {
  full_name?: string | null;
  avatar_url?: string | null;
  role?: string | null;
}

export interface AuthContextType {
  user: UserWithProfile | null;
  session: any | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<void>;
  userRole?: string | null;
}
