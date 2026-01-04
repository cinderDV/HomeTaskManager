import { pb } from "@/lib/pb";

export async function login(username: string, password: string) {
  try {
    const authData = await pb.collection("users").authWithPassword(username, password);

    // Sincronizar el token con las cookies para el middleware
    if (pb.authStore.token) {
      document.cookie = `pb_auth=${pb.authStore.token}; path=/; max-age=31536000; SameSite=Lax`;
    }

    return authData;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
}

export function logout() {
  pb.authStore.clear();

  // Limpiar la cookie
  document.cookie = 'pb_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
