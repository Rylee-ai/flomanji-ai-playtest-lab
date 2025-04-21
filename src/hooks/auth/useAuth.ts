
import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

/** Consumer hook for global auth state. Throws if used outside AuthProvider. */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
