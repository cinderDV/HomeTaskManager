// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  
  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;// Reemplaza la entrada en el historial, no se puede volver atrás
  }
  
  // Si hay usuario, muestra el componente hijo
  return <>{children}</>;
}