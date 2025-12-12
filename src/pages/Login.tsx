import "../styles/login.css";
import logo from '../assets/logo.png'
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const { login } = useAuth();
  const nav = useNavigate();  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      nav("/"); // redirige al home
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  
  return (
<div className="login-container">
      
      {/* CORRECCIÓN 1: Todo el contenido vive dentro de la 'tarjeta' */}
      <form className="login-form" onSubmit={handleSubmit}>
        
        {/* Logo centrado arriba dentro de la tarjeta */}
        <div className="login-logo-wrapper">
            <img src={logo} alt="Logo" className="login-logo" />
        </div>
        
        <h1 className="welcome-message">Bienvenido</h1>
        
        {/* CORRECCIÓN 2: Bloque de error estructurado para estilo alerta */}
        {error && (
          <div className="error-alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="input-group">
            <input 
              className="login-info"
              placeholder="Usuario" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if(error) setError(""); 
              }}
            />
        </div>
        
        <div className="password-wrapper">
          <input
            className="login-info password-input"
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if(error) setError("");
            }}
          />
          <button
            type="button"
            className="toggle-pass"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPass ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a19.94 19.94 0 0 1 5.06-6.93" />
                <path d="M1 1l22 22" />
                <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
