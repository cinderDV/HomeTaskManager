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
    // Escuchar cambios en la autenticación con la declaracion del listener OnChange
    // Este listener se ejecuta CADA VEZ que authStore cambia
    const unsubscribe = pb.authStore.onChange(() => {
      console.log("🔄 onChange disparado");
      console.log("🎫 Token:", pb.authStore.token ? "Presente" : "Ausente");
      console.log("👤 Record:", pb.authStore.record);
      setUser(pb.authStore.record as User | null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string) => {
    console.log("🔑 Intentando login...");
    try {
      await loginService(username, password);
      console.log("✅ Login exitoso");
      console.log("👤 Usuario logueado:", pb.authStore.record);
      setUser(pb.authStore.record as User | null);
    } catch (error) {
      console.error("❌ Error en login:", error);
      throw error; // Re-lanza el error para que el componente lo maneje
    }
  };

  const logout = () => {
    console.log("👋 Cerrando sesión...");
    logoutService();
    setUser(null);
    console.log("✅ Sesión cerrada");
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