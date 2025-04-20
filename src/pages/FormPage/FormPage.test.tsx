import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { FormPage } from './FormPage'
import * as userService from '@/services/user'

const fillValidForm = async () => {
  await userEvent.type(screen.getByLabelText(/nome completo/i), 'Fernanda Oshiro')
  await userEvent.type(screen.getByLabelText(/e-mail/i), 'fernanda@example.com')
  await userEvent.type(screen.getByLabelText(/cpf/i), '52998224725')
  await userEvent.type(screen.getByLabelText(/telefone/i), '11999999999')
}

const fillInvalidForm = async () => {
  await userEvent.type(screen.getByLabelText(/nome completo/i), 'Fe')
  await userEvent.type(screen.getByLabelText(/e-mail/i), 'fernanda')
  await userEvent.type(screen.getByLabelText(/cpf/i), '52998')
  await userEvent.type(screen.getByLabelText(/telefone/i), '1199')
}

describe('FormPage', () => {
  it('envia o formulário com dados válidos (com spy)', async () => {
    const spy = vi.spyOn(userService, 'saveUser').mockImplementation(async () => ({
      success: true,
    }))

    render(<FormPage />)
    await fillValidForm()

    const button = screen.getByRole('button', { name: /cadastrar/i })
    await userEvent.click(button)

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        name: 'Fernanda Oshiro',
        email: 'fernanda@example.com',
        cpf: '52998224725',
        phone: '11999999999',
      })
    })

    spy.mockRestore()
  })

  it('exibe mensagens de erro por campo inválido', async () => {
    render(<FormPage />)
    await fillInvalidForm()

    const button = screen.getByRole('button', { name: /cadastrar/i })
    await userEvent.click(button)

    expect(await screen.findByText(/campo deve conter 3 caracteres/i)).toBeInTheDocument()
    expect(await screen.findByText(/campo deve conter um e-mail válido/i)).toBeInTheDocument()
    expect(await screen.findByText(/campo inválido: cpf/i)).toBeInTheDocument()
    expect(await screen.findByText(/ddd, número/i)).toBeInTheDocument()
  })

  it('mantém o botão desabilitado com formulário inválido', () => {
    render(<FormPage />)
    const button = screen.getByRole('button', { name: /cadastrar/i })
    expect(button).toBeDisabled()
  })
})
