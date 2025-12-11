import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/home.css'

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <div className="home-container">
        <h1>Bienvenido al Home</h1>
        <p>Usuario: {user?.username || user?.email}</p>
        <button onClick={handleLogout}>cerrar Sesion</button>
      </div>
    </>

  );
}
