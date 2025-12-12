import {pb} from "@/lib/pb";

export async function login(username: string, password: string) {
  
  try {
    return await pb.collection("users").authWithPassword(username, password);
  } catch (error) {
    throw new Error(error + "Error al iniciar sesión");
  }
}
export function logout() {
  pb.authStore.clear();
}
