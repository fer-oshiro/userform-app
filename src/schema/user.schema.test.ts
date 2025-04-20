import { describe, it, expect } from 'vitest'
import { userSchema } from './user.schema'

describe('userSchema', () => {
  describe('name', () => {
    it('falha se tiver menos de 3 caracteres', () => {
      const result = userSchema.safeParse({
        name: 'Al',
        cpf: '52998224725',
        phone: '11999999999',
        email: 'al@example.com',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        console.log(result.error.format())
        expect(result.error.format().name?._errors).toEqual(
          expect.arrayContaining([
            'Campo deve conter 3 caracteres ou mais',
            'Campo deve conter nome e sobrenome',
          ])
        )
      }
    })

    it('falha se não tiver sobrenome', () => {
      const result = userSchema.safeParse({
        name: 'Alice',
        cpf: '52998224725',
        phone: '11999999999',
        email: 'alice@example.com',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.format().name?._errors).toContain('Campo deve conter nome e sobrenome')
      }
    })
  })

  describe('cpf', () => {
    it('falha se tiver menos de 11 dígitos', () => {
      const result = userSchema.safeParse({
        name: 'Alice Souza',
        cpf: '12345678',
        phone: '11999999999',
        email: 'alice@example.com',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.format().cpf?._errors).toContain('Campo inválido: CPF')
      }
    })

    it('falha se o CPF for inválido', () => {
      const result = userSchema.safeParse({
        name: 'Bob Souza',
        cpf: '12345678901',
        phone: '11999999999',
        email: 'bob@example.com',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.format().cpf?._errors).toContain('Campo inválido: CPF')
      }
    })
  })

  describe('phone', () => {
    it('falha se o telefone for incompleto', () => {
      const result = userSchema.safeParse({
        name: 'Carol Souza',
        cpf: '52998224725',
        phone: '11999',
        email: 'carol@example.com',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.format().phone?._errors[0]).toMatch(/Campo deve conter DDD/)
      }
    })

    it('falha se o telefone contiver letras', () => {
      const result = userSchema.safeParse({
        name: 'Carol Souza',
        cpf: '52998224725',
        phone: '11asd999999999',
        email: 'carol@example.com',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.format().phone?._errors[0]).toMatch(/Campo deve conter DDD/)
      }
    })
  })

  describe('email', () => {
    it('falha se o e-mail for inválido', () => {
      const result = userSchema.safeParse({
        name: 'Diego Souza',
        cpf: '52998224725',
        phone: '11999999999',
        email: 'invalid-email',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.format().email?._errors).toContain('Campo deve conter um e-mail válido')
      }
    })
  })

  it('passa com todos os campos válidos', () => {
    const result = userSchema.safeParse({
      name: 'Diego Souza',
      cpf: '529.982.247-25',
      phone: '(11) 98765-4321',
      email: 'diego@example.com',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.cpf).toBe('52998224725')
      expect(result.data.phone).toBe('11987654321')
    }
  })
})
