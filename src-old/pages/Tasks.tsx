import { useEffect, useState } from "react";
import { pb } from "@/lib/pb"; 
import { SearchOutline, UnorderedListOutline } from "antd-mobile-icons";
import "@/styles/tasks.css";

interface Tarea {
  id: string;
  collectionId: string;
  collectionName: string;
  Titulo: string;
  Puntos: number;
  Zona: string;
  foto_ref: string;
  
}

export default function Tasks() {

  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const records = await pb.collection('tareas_def').getFullList<Tarea>({
          sort: '-created',
          requestKey: null, // Evita el error de autocancel
        });
        setTasks(records);
      } catch (error) {
        if (error.name !== 'AbortError') console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const getImageUrl = (record: Tarea) => {
    if (!record.foto_ref) return null;
    return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.foto_ref}`;
  };

  const handleTaskClick = (task: Tarea) => {
    alert(`Elegiste: ${task.Titulo} (+${task.Puntos} pts)`); 
  };

  return (
    <div className="tasks-container">
      
      {/* 1. SECCIÓN FIJA (NO SCROLLEA) */}
      <div className="tasks-fixed-top">
        <header className="tasks-header">
          <h1 className="tasks-title">Catálogo</h1>
          <p className="tasks-subtitle">Elige una tarea para sumar puntos</p>
        </header>

        <div className="search-bar">
          <SearchOutline fontSize={20} color="#1A1A1A" />
          <span style={{color: "#999", marginLeft: "8px"}}>Buscar tarea...</span>
        </div>
      </div>

      {/* 2. ÁREA DE SCROLL (SOLO ESTO SE MUEVE) */}
      <div className="tasks-scroll-area">
        {loading && <div className="loading-state">Cargando catálogo...</div>}

        {!loading && (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <button 
                key={task.id} 
                className="task-card" 
                onClick={() => handleTaskClick(task)}
              >
                <div className="points-badge">+{task.Puntos} pts</div>
                
                <div className="task-image-container">
                  {task.foto_ref ? (
                    <img src={getImageUrl(task)!} alt={task.Titulo} className="task-img" />
                  ) : (
                    <UnorderedListOutline fontSize={32} color="#1A1A1A" />
                  )}
                </div>

                <div className="task-info">
                  {task.Zona && <span className="task-zone">{task.Zona}</span>}
                  <h3 className="task-name">{task.Titulo}</h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}