// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout/Layout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Tasks from "./pages/Tasks";
import History from "./pages/History";
import Stats from "./pages/Stats";

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
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout /> {/* 👈 Layout envuelve todo */}
              </ProtectedRoute>
            }
          >
            {/* Rutas hijas - se renderizan en el <Outlet /> del Layout */}
            <Route index element={<Home />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="history" element={<History />} />
            <Route path="stats" element={<Stats />} />
            <Route path="user" element={<User />} />
          </Route>

          {/* Ruta catch-all: redirige cualquier ruta desconocida */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);