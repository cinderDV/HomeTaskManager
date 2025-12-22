// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useAuth();
  
  // Si ya está autenticado, redirige al home
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  // Si no está autenticado, muestra el login
  return <>{children}</>;
}