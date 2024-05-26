import { AuthContext } from "@/contexts/auth-context-provider";
import { useContext } from "react";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within a AuthContext Provider"
    );
  }

  return context;
}
