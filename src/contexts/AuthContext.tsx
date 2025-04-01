
import { createContext, useContext } from "react";
import { AuthContextType } from "@/types/auth";

// Create the context with null as default value
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
