import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './index'

describe('Input', () => {
  it('renderiza o input', () => {
    render(<Input label="Nome completo" id="name" />)
    const input = screen.getByLabelText('Nome completo') as HTMLInputElement
    expect(input).toBeInTheDocument()
  })

  it('associa o label ao input corretamente', () => {
    render(<Input label="Email" id="email" />)
    const label = screen.getByText('Email')
    const input = screen.getByLabelText('Email')

    expect(label).toHaveAttribute('for', 'email')
    expect(input).toHaveAttribute('id', 'email')
  })

  it('permite digitar no input', async () => {
    render(<Input label="Nome completo" id="name" />)
    const input = screen.getByLabelText('Nome completo') as HTMLInputElement

    await userEvent.type(input, 'Fernanda Oshiro')
    expect(input.value).toBe('Fernanda Oshiro')
  })

  it('exibe mensagem de erro se passado', () => {
    render(<Input label="CPF" name="cpf" error="CPF inválido" />)
    expect(screen.getByRole('alert')).toHaveTextContent('CPF inválido')
    expect(screen.getByLabelText('CPF')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('CPF')).toHaveAttribute('aria-describedby', 'cpf-error')
  })
})
