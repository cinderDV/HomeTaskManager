'use client'
import { useAuth } from "@/context/AuthContext"

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col h-full p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Bienvenido{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-muted-foreground">
          ¡Listo para empezar a completar tareas!
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Puntos Totales
          </h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Tareas Completadas
          </h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Racha Actual
          </h3>
          <p className="text-3xl font-bold">0 días</p>
        </div>
      </div>

      <div className="flex-1 bg-muted/50 rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">
          Contenido del dashboard en desarrollo
        </p>
      </div>
    </div>
  )
}
