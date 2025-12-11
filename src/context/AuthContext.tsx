// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { RecordModel } from "pocketbase";

import pb from "../lib/pb";
import { login as loginService, logout as logoutService } from "../services/authService";

// Define tu interfaz de usuario extendiendo RecordModel
interface User extends RecordModel {
  email: string;
  username?: string;
  name?: string;
  avatar?: string;
  // Agrega aquí otros campos personalizados de tu colección 'users'
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(pb.authStore.record as User | null);

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.record as User | null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string) => {
    // ✅ Removido el try/catch innecesario - deja que el error se propague
    await loginService(username, password);
    setUser(pb.authStore.record as User | null);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Exportación separada para evitar warning de Fast Refresh
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};