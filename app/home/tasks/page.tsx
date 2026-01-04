'use client'
import { useEffect, useState } from "react";
import { pb } from "@/lib/pb";
import { Search, List } from "lucide-react";

interface Tarea {
  id: string;
  collectionId: string;
  collectionName: string;
  Titulo: string;
  Puntos: number;
  Zona: string;
  foto_ref: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const records = await pb.collection('tareas_def').getFullList<Tarea>({
          sort: '-created',
        });
        setTasks(records);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const getImageUrl = (record: Tarea) => {
    if (!record.foto_ref) return null;
    return `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.foto_ref}`;
  };

  const handleTaskClick = (task: Tarea) => {
    alert(`Elegiste: ${task.Titulo} (+${task.Puntos} pts)`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sección fija (header y búsqueda) */}
      <div className="flex-shrink-0 p-6 space-y-4">
        <header>
          <h1 className="text-3xl font-bold">Catálogo</h1>
          <p className="text-muted-foreground">Elige una tarea para sumar puntos</p>
        </header>

        <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-lg">
          <Search className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">Buscar tarea...</span>
        </div>
      </div>

      {/* Área scrolleable */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Cargando catálogo...</p>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="relative flex flex-col p-4 bg-card rounded-lg border hover:border-primary transition-colors text-left group"
              >
                {/* Badge de puntos */}
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                  +{task.Puntos} pts
                </div>

                {/* Imagen/Icono */}
                <div className="flex items-center justify-center h-32 mb-4 bg-muted rounded-md overflow-hidden">
                  {task.foto_ref ? (
                    <img
                      src={getImageUrl(task)!}
                      alt={task.Titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <List className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  {task.Zona && (
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {task.Zona}
                    </span>
                  )}
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {task.Titulo}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <List className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay tareas disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}
