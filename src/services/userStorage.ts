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

function hasDuplicateUser(user: User, map: Map<string, User>): boolean {
  return makeUserKeys(user).some((key) => map.has(key))
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

  const hasDuplicate = hasDuplicateUser(newUser, userMap)
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

function fieldConflict(field: 'email' | 'phone', updated: User, map: Map<string, User>) {
  const value = updated[field]
  const existing = map.get(`${field}:${value}` as UserKey)
  return existing && existing.cpf !== updated.cpf
}

export async function editUser(updated: User): Promise<void> {
  const users = await getUsers()
  if (!userMap) userMap = buildUserMap(users)

  const existing = userMap.get(`cpf:${updated.cpf}`)
  if (!existing) {
    throw new Error('Usuário não encontrado')
  }

  const isDifferent =
    updated.email !== existing.email ||
    updated.phone !== existing.phone ||
    updated.name !== existing.name

  if (!isDifferent) throw new Error('Nenhuma alteração detectada')

  if (updated.email !== existing.email && fieldConflict('email', updated, userMap)) {
    throw new Error('E-mail já existente')
  }
  if (updated.phone !== existing.phone && fieldConflict('phone', updated, userMap)) {
    throw new Error('Telefone já existente')
  }

  const index = users.findIndex((u) => u.cpf === updated.cpf)
  users[index] = updated

  cachedUsers = users
  userMap = buildUserMap(users)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}
