import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../helpers/supabaseClient";

interface AuthContextProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState("");

  const getUserId = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      if (data) {
        setUserId(data.user?.id || "");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error obteniendo el ID del usuario:", error.message);
      } else {
        console.error("Error desconocido obteniendo el ID del usuario:", error);
      }
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  const contextValue: AuthContextProps = {
    userId,
    setUserId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
