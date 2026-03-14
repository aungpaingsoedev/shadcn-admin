/**
 * API layer - replace baseUrl with your Puzzle API or backend.
 * Puzzle: https://docs.puzzle.online
 */

const BASE_URL = "https://jsonplaceholder.typicode.com"

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json() as Promise<T>
}

export interface User {
  id: number
  name: string
  email: string
  username: string
  phone?: string
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export const usersApi = {
  list: () => api<User[]>("/users"),
  get: (id: number) => api<User>(`/users/${id}`),
}

export const postsApi = {
  list: () => api<Post[]>("/posts?_limit=20"),
}
