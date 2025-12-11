// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";

import "./index.css";
import TabBar from "./components/TabBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
          }/>
          {/* Rutas privadas */}
          <Route path="/" 
            element={
              <ProtectedRoute>
                <Home />
                <TabBar></TabBar>
              </ProtectedRoute>
          }/>
          <Route path="/user" 
            element={
              <ProtectedRoute>
                <User />
                <TabBar></TabBar>
              </ProtectedRoute>
          }/>

          {/* Ruta catch-all: redirige cualquier ruta desconocida */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);