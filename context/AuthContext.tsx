'use client'
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { RecordModel } from "pocketbase";

import { pb } from "@/lib/pb";
import { login as loginService, logout as logoutService } from "@/services/authService";

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
    // Sincronizar el token inicial con las cookies al cargar la app
    if (pb.authStore.token) {
      document.cookie = `pb_auth=${pb.authStore.token}; path=/; max-age=31536000; SameSite=Lax`;
    }

    // Escuchar cambios en la autenticación con la declaracion del listener OnChange
    // Este listener se ejecuta CADA VEZ que authStore cambia
    const unsubscribe = pb.authStore.onChange(() => {
      console.log("🔄 onChange disparado");
      console.log("🎫 Token:", pb.authStore.token ? "Presente" : "Ausente");
      console.log("👤 Record:", pb.authStore.record);
      setUser(pb.authStore.record as User | null);

      // Sincronizar con cookies cada vez que cambie el authStore
      if (pb.authStore.token) {
        document.cookie = `pb_auth=${pb.authStore.token}; path=/; max-age=31536000; SameSite=Lax`;
      }
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
      // No es necesario llamar setUser aquí porque el onChange ya lo hace automáticamente
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

// Exportación separada para evitar warning de Fast Refresh
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
