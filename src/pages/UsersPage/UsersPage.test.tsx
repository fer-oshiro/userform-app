import type { User } from '@/schema/user.schema'
import * as userStorage from '@/services/userStorage'
import { renderWithRouter } from '@/tests/MemoryRouter'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { UsersPage } from '.'

const mockUser: User = {
  name: 'Alice Teste',
  cpf: '12345678901',
  phone: '11999999999',
  email: 'alice@example.com',
}

describe('UsersPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('renderiza lista corretamente com usuários simulados', async () => {
    vi.spyOn(userStorage, 'getUsers').mockResolvedValue([mockUser])

    renderWithRouter(<UsersPage />)

    expect(await screen.findByText('Alice Teste')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument()
  })

  it('exibe texto "Nenhum usuário encontrado" se estiver vazia', async () => {
    vi.spyOn(userStorage, 'getUsers').mockResolvedValue([])

    renderWithRouter(<UsersPage />)

    expect(await screen.findByText(/nenhum usuário encontrado/i)).toBeInTheDocument()
  })

  it('remove usuário ao clicar em "Excluir"', async () => {
    const getUsersSpy = vi.spyOn(userStorage, 'getUsers')
    getUsersSpy.mockResolvedValueOnce([mockUser])
    getUsersSpy.mockResolvedValueOnce([])

    const deleteSpy = vi.spyOn(userStorage, 'deleteUser').mockResolvedValue()

    renderWithRouter(<UsersPage />)

    const excluirBtn = await screen.findByRole('button', { name: /excluir/i })
    await userEvent.click(excluirBtn)

    await waitFor(() => {
      expect(screen.queryByText('Alice Teste')).not.toBeInTheDocument()
    })
    expect(deleteSpy).toHaveBeenCalledWith('12345678901')
  })
})
