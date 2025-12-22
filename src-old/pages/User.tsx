import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { EditSOutline, RightOutline } from "antd-mobile-icons"; // Usamos los iconos de la opción A
import '@/styles/user.css'

// URL base de tu PocketBase (ajusta esto si usas una variable de entorno)
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

export default function User() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Construcción de la URL del avatar de PocketBase
    // Patrón: /api/files/COLLECTION_ID/RECORD_ID/FILENAME
    const avatarUrl = user?.avatar 
        ? `${PB_URL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`
        : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"; // Fallback divertido

    // Color del usuario o negro por defecto
    const userBorderColor = user?.color || "#1A1A1A";

    return (
        <div className="user-container">
            
            {/* 1. Tarjeta de Perfil Principal */}
            <div className="profile-card">
                <div className="profile-header">
                    <div 
                        className="avatar-frame" 
                        style={{ borderColor: userBorderColor, boxShadow: `4px 4px 0px ${userBorderColor}` }}
                    >
                        <img src={avatarUrl} alt="Avatar" className="avatar-img" />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{user?.name || "Usuario"}</h1>
                        <p className="profile-email">{user?.email}</p>
                        <span className="profile-badge" style={{ backgroundColor: userBorderColor }}>
                            Miembro Activo
                        </span>
                    </div>
                    <button className="edit-btn">
                        <EditSOutline fontSize={20} />
                    </button>
                </div>
            </div>

            {/* 2. Bloques de Estadísticas (Placeholders para el futuro) */}
            <div className="stats-grid">
                <div className="stat-box">
                    <span className="stat-value">1,250</span>
                    <span className="stat-label">Puntos</span>
                </div>
                <div className="stat-box">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Tareas</span>
                </div>
                <div className="stat-box">
                    <span className="stat-value">#1</span>
                    <span className="stat-label">Ranking</span>
                </div>
            </div>

            {/* 3. Menú de Opciones */}
            <div className="menu-list">
                <button className="menu-item">
                    <span>Configuración de Casa</span>
                    <RightOutline />
                </button>
                <button className="menu-item">
                    <span>Historial de Aportes</span>
                    <RightOutline />
                </button>
            </div>

            {/* 4. Botón de Salida */}
            <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
            </button>
        </div>
    );
}