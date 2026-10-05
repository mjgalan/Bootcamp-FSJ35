const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

import { User } from "../types";
import { Productos} from "../types";
import { AuthResponse } from "../types";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  //API_URL = http://127.0.0.1:8000/api
  //endpoint -> Me lo pasan por Param request('/posts',)
  //http://127.0.0.1:8000/api/posts
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }

  return data; 
}

export const api = {
  // Auth 
  /* api.register({
    name: "Ciro"; 
    email: "ciro@kpo.com"; 
    password: "Asd.1234" 
  }) */
  register: (body: { name: string; email: string; password: string }) =>
    request<{ message: string }>('/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  login: (body: { email: string; password: string }) =>
    request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  // Productos
  getPosts: () => request<{ data: Productos[] }>('/productos', { method: 'GET' }),

  createPost: (body: { nombre: string; precio: number; cantidad: number }) =>
    request<{ message: string; data: Productos }>('/producto', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  updatePost: (id: number, body: { nombre: string; precio: number; cantidad: number }) =>
    request<{ message: string; data: Productos }>(`/producto/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  deletePost: (id: number) =>
    request<{ message: string }>(`/producto/${id}`, {
      method: 'DELETE',
    }),

  restorePost: (id: number) =>
    request<{ message: string }>(`/producto/${id}/restore`, {
      method: 'PUT',
    }),
};