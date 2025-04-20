import { UserSchema } from '@/schema/user.schema'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function fetchRemoteUsers() {
  return fetch(`${API_URL}/users`).then((res) => res.json())
}

export async function saveUser(
  newUser: UserSchema
): Promise<{ success: true } | { success: false; message: string }> {
  console.log('Saving: ', newUser)
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { success: true }
}
