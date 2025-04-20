import { User } from '@/schema/user.schema'

const API_URL = import.meta.env.VITE_API_URL

export async function fetchRemoteUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) throw new Error('Erro ao buscar usuários da API')
  return response.json()
}
