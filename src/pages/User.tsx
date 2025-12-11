import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function User() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (<>
        <h1>Bienvenido {user?.name}</h1>
        <div>User</div>
        <p>Usuario: {user?.username || user?.email}</p>
        <button onClick={handleLogout}>cerrar Sesion</button>
    </>
    )
}

