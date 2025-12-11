
import { NavLink } from 'react-router-dom'
import '../styles/tabbar.css'

interface  TabButtonProperties{
  nombre?: string;
  ruta:string;
  icono?: React.ReactNode; 
}

export default function TabButton ({ nombre, ruta, icono }: TabButtonProperties){
  return (
    <NavLink 
      to={ruta}
      className={({ isActive }) => 
        isActive ? "tab-button active" : "tab-button"
      }
    >
      {icono && <span className="tab-icon">{icono}</span>}
      <span>{nombre}</span>
    </NavLink>
  )
}




