import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Obtener el token de autenticación de las cookies
  // PocketBase guarda el token en localStorage en el cliente,
  // pero para verificación en el servidor necesitamos cookies
  const token = request.cookies.get('pb_auth')?.value

  const { pathname } = request.nextUrl

  // Rutas protegidas que requieren autenticación
  if (pathname.startsWith('/home')) {
    if (!token) {
      // Si no hay token, redirige al login
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Ruta de login - si ya está autenticado, redirige a /home
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

// Configurar qué rutas deben pasar por el middleware
export const config = {
  matcher: [
    '/',
    '/home/:path*',
  ]
}
