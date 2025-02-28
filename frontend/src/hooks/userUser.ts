import { UserContextType, UserContext } from "@/components/context/UserContext";
import { useContext } from "react";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
