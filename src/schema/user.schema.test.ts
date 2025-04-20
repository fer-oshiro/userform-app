import { describe, it, expect } from 'vitest'
import { userSchema } from './user.schema'

describe('userSchema', () => {
  it('falha se o nome tiver menos de 3 caracteres', () => {
    const result = userSchema.safeParse({
      name: 'Al',
      cpf: '52998224725',
      phone: '11999999999',
      email: 'al@example.com',
    })
    expect(result.success).toBe(false)
  })

  it('falha se o nome não tiver sobrenome', () => {
    const result = userSchema.safeParse({
      name: 'Alice',
      cpf: '52998224725',
      phone: '11999999999',
      email: 'alice@example.com',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().name?._errors).toContain(
        'Nome deve conter pelo menos um sobrenome'
      )
    }
  })

  it('falha se o CPF tiver menos de 11 dígitos', () => {
    const result = userSchema.safeParse({
      name: 'Alice Souza',
      cpf: '12345678',
      phone: '11999999999',
      email: 'alice@example.com',
    })
    expect(result.success).toBe(false)
  })

  it('falha se o CPF for inválido', () => {
    const result = userSchema.safeParse({
      name: 'Bob Souza',
      cpf: '12345678901',
      phone: '11999999999',
      email: 'bob@example.com',
    })
    expect(result.success).toBe(false)
  })

  it('falha se o telefone for incompleto', () => {
    const result = userSchema.safeParse({
      name: 'Carol Souza',
      cpf: '52998224725',
      phone: '11999',
      email: 'carol@example.com',
    })
    expect(result.success).toBe(false)
  })

  it('falha se o telefone conter letras', () => {
    const result = userSchema.safeParse({
      name: 'Carol Souza',
      cpf: '52998224725',
      phone: '11asd999999999',
      email: 'carol@example.com',
    })
    expect(result.success).toBe(false)
  })

  it('falha se o e-mail for inválido', () => {
    const result = userSchema.safeParse({
      name: 'Diego Souza',
      cpf: '52998224725',
      phone: '11999999999',
      email: 'invalid-email',
    })
    expect(result.success).toBe(false)
  })

  it('passa com todos os campos válidos', () => {
    const result = userSchema.safeParse({
      name: 'Diego Souza',
      cpf: '529.982.247-25',
      phone: '(11) 98765-4321',
      email: 'diego@example.com',
    })
    expect(result.success).toBe(true)
  })
})
