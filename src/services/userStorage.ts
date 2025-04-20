import { STORAGE_KEY } from '@/constants/storage'
import type { User } from '@/schema/user.schema'
import { fetchRemoteUsers } from './api/users'

type UserKey = `cpf:${string}` | `email:${string}` | `phone:${string}`

const makeUserKeys = (user: User): UserKey[] => [
  `cpf:${user.cpf}`,
  `email:${user.email}`,
  `phone:${user.phone}`,
]

let cachedUsers: User[] | null = null
let userMap: Map<UserKey, User> | null = null

function buildUserMap(users: User[]): Map<UserKey, User> {
  const map = new Map<UserKey, User>()
  for (const user of users) {
    for (const key of makeUserKeys(user)) {
      map.set(key, user)
    }
  }
  return map
}

export async function getUsers(): Promise<User[]> {
  if (cachedUsers) return cachedUsers

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    cachedUsers = JSON.parse(stored)
  } else {
    const remote = await fetchRemoteUsers()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remote))
    cachedUsers = remote
  }
  if (!cachedUsers) throw new Error('Usuários não carregados corretamente')
  userMap = buildUserMap(cachedUsers)
  return cachedUsers
}

export async function saveUser(newUser: User): Promise<void> {
  const users = await getUsers()
  if (!userMap) userMap = buildUserMap(users)

  const hasDuplicate = makeUserKeys(newUser).some((key) => userMap!.has(key))
  if (hasDuplicate) {
    throw new Error('Usuário já existente')
  }

  users.push(newUser)
  for (const key of makeUserKeys(newUser)) {
    userMap.set(key, newUser)
  }

  cachedUsers = users
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export async function deleteUser(cpf: string): Promise<void> {
  const users = await getUsers()
  const filtered = users.filter((user) => user.cpf !== cpf)

  cachedUsers = filtered
  userMap = buildUserMap(filtered)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function clearUserCache(): void {
  cachedUsers = null
  userMap = null
}
