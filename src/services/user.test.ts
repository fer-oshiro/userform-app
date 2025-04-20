import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getUsers, saveUser, deleteUser, clearUserCache, editUser } from './userStorage'
import { STORAGE_KEY } from '@/constants/storage'
import type { User } from '@/schema/user.schema'
import * as api from './api/users'

const mockUser: User = {
  name: 'Alice Teste',
  cpf: '12345678901',
  phone: '11999999999',
  email: 'alice@example.com',
}

const otherUser = {
  name: 'Bob',
  cpf: '22222222222',
  email: 'bob@example.com',
  phone: '11888888888',
}

const updatedUser = {
  ...mockUser,
  email: 'alice.new@example.com',
}

describe('userStorage service', () => {
  beforeEach(() => {
    vi.spyOn(api, 'fetchRemoteUsers').mockImplementation(async () => [])
    localStorage.clear()
    clearUserCache()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchRemoteUsers deve retornar dados da API', async () => {
    vi.spyOn(api, 'fetchRemoteUsers').mockImplementation(async () => [mockUser])
    const result = await api.fetchRemoteUsers()
    expect(result).toEqual([mockUser])
  })

  it('getUsers deve retornar do localStorage se existir', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockUser]))
    const result = await getUsers()
    expect(result).toEqual([mockUser])
  })

  it('getUsers deve buscar da API se localStorage estiver vazio', async () => {
    vi.spyOn(api, 'fetchRemoteUsers').mockResolvedValue([mockUser])

    const result = await getUsers()
    expect(result).toEqual([mockUser])
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify([mockUser]))
    expect(api.fetchRemoteUsers).toHaveBeenCalled()
  })

  it('saveUser salva usuário corretamente e atualiza localStorage', async () => {
    await saveUser(mockUser)
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toHaveLength(1)
    expect(stored[0].cpf).toBe(mockUser.cpf)
  })

  it('saveUser lança erro se o usuário já existir (cpf, email ou phone)', async () => {
    await saveUser(mockUser)
    await expect(saveUser({ ...mockUser, email: 'outra@example.com' })).rejects.toThrow(
      'Usuário já existente'
    )
    await expect(saveUser({ ...mockUser, cpf: '00000000000' })).rejects.toThrow(
      'Usuário já existente'
    )
    await expect(saveUser({ ...mockUser, phone: '11888888888' })).rejects.toThrow(
      'Usuário já existente'
    )
  })

  it('deleteUser remove usuário corretamente', async () => {
    await saveUser(mockUser)
    await deleteUser(mockUser.cpf)
    const result = await getUsers()
    expect(result).toHaveLength(0)
  })

  it('edita usuário com sucesso quando dados não entram em conflito', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockUser, otherUser]))
    await editUser(updatedUser)

    const updated = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(updated).toEqual([updatedUser, otherUser])
  })

  it('lança erro se nenhuma alteração for detectada', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockUser]))
    await expect(() => editUser(mockUser)).rejects.toThrow('Nenhuma alteração detectada')
  })

  it('lança erro se o novo e-mail já pertencer a outro usuário', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockUser, otherUser]))

    const conflictingEmailUser = {
      ...mockUser,
      email: otherUser.email,
    }

    await expect(() => editUser(conflictingEmailUser)).rejects.toThrow('E-mail já existente')
  })

  it('lança erro se o novo telefone já pertencer a outro usuário', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockUser, otherUser]))

    const conflictingPhoneUser = {
      ...mockUser,
      phone: otherUser.phone,
    }

    await expect(() => editUser(conflictingPhoneUser)).rejects.toThrow('Telefone já existente')
  })

  it('lança erro se o CPF não for encontrado', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([otherUser]))

    await expect(() => editUser({ ...mockUser, email: 'novo@example.com' })).rejects.toThrow(
      'Usuário não encontrado'
    )
  })

  it('permite editar apenas o nome sem erro', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockUser]))

    const updatedUser: User = {
      ...mockUser,
      name: 'Alice Alterada',
    }

    await editUser(updatedUser)

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toEqual([updatedUser])
  })
})
