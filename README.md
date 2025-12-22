# Home Task Manager

Aplicación web para gestión de tareas del hogar, desarrollada con Next.js 16, React 19 y TypeScript.

## Descripción del Proyecto

Home Task Manager es una aplicación moderna para organizar y gestionar tareas domésticas. El proyecto fue migrado recientemente de React + Vite a Next.js para aprovechar las ventajas del framework como:

- Server-side rendering (SSR)
- Routing basado en sistema de archivos
- Optimizaciones automáticas de rendimiento
- API routes integradas

## Tecnologías Utilizadas

- **Framework:** Next.js 16.0.10
- **React:** 19.2.1
- **TypeScript:** ^5
- **Estilos:** Tailwind CSS 4
- **Componentes UI:**
  - Radix UI (componentes accesibles)
  - shadcn/ui
  - Lucide React (iconos)
- **Testing:** Vitest + Playwright
- **Linter:** ESLint 9

## Requisitos Previos

- Node.js (versión recomendada: 18 o superior)
- npm, yarn, pnpm o bun

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd HomeTaskManager
```

2. Instala las dependencias:
```bash
npm install
```

## Comandos Disponibles

### Modo Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Build de Producción
```bash
npm run build
```

### Iniciar en Producción
```bash
npm run start
```

### Linting
```bash
npm run lint
```

### Storybook (Documentación de Componentes)
```bash
npm run storybook
```

## Estructura del Proyecto

```
HomeTaskManager/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio (Login)
│   ├── home/              # Ruta /home
│   │   ├── page.tsx       # Vista principal
│   │   └── user/          # Ruta /home/user
│   │       └── page.tsx   # Perfil de usuario
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── app-sidebar.tsx    # Barra lateral de navegación
│   └── ui/                # Componentes UI (shadcn)
├── lib/                   # Utilidades y helpers
├── hooks/                 # Custom hooks de React
├── src-old/              # Código legacy (React + Vite)
└── public/               # Archivos estáticos
```

## Características Actuales

- Sistema de autenticación (en desarrollo)
- Sidebar de navegación responsive
- Sistema de breadcrumbs
- Componentes UI accesibles con Radix UI
- Diseño responsive con Tailwind CSS

## Historial de Migración

### Paquetes Instalados Durante la Configuración Inicial

```bash
# Creación del proyecto
npx create-next-app@latest home-tasks-manager-nextjs --yes

# Storybook para documentación de componentes
npm create storybook@latest

# Sistema de iconos
npm install lucide-react

# Configuración de shadcn/ui
npx shadcn@latest init

# Componentes Radix UI
npm install @radix-ui/react-accordion
npm install @radix-ui/react-slot
npm install @radix-ui/react-label
npm install @radix-ui/react-separator
npm install @radix-ui/react-dialog
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-menubar
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-avatar
npm install @radix-ui/react-collapsible
```

## Tareas Pendientes

- [ ] Implementar navegación entre rutas con componentes integrados de Next.js
- [ ] Conectar con backend (PocketBase según código legacy)
- [ ] Implementar sistema de autenticación completo
- [ ] Migrar funcionalidad de gestión de tareas
- [ ] Migrar vistas de estadísticas e historial
- [ ] Configurar variables de entorno
- [ ] Implementar tests con Vitest

## Notas de Desarrollo

- El proyecto utiliza la fuente Geist de Vercel, optimizada con `next/font`
- El código legacy de React + Vite se mantiene en la carpeta `src-old/` para referencia
- Se utiliza el App Router de Next.js (no Pages Router)

## Despliegue

La forma más sencilla de desplegar la aplicación es usando [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Recursos de Aprendizaje

- [Documentación de Next.js](https://nextjs.org/docs) - características y API de Next.js
- [Tutorial Interactivo de Next.js](https://nextjs.org/learn) - aprende Next.js paso a paso
- [shadcn/ui](https://ui.shadcn.com/) - documentación de componentes UI
- [Radix UI](https://www.radix-ui.com/) - primitivas de componentes accesibles


