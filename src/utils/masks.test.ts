import { describe, it, expect } from 'vitest'
import { formatCPF, formatPhone } from '@/utils/masks'

describe('formatCPF', () => {
  it('formata um CPF com apenas números', () => {
    expect(formatCPF('12345678901')).toBe('123.456.789-01')
  })

  it('remove caracteres não numéricos antes de formatar', () => {
    expect(formatCPF('123.456.789-01')).toBe('123.456.789-01')
    expect(formatCPF('123-456.78901')).toBe('123.456.789-01')
  })

  it('trunca se houver mais que 11 dígitos', () => {
    expect(formatCPF('1234567890123')).toBe('123.456.789-01')
  })

  it('retorna vazio se input for vazio', () => {
    expect(formatCPF('')).toBe('')
  })
})

describe('formatPhone', () => {
  it('formata número de telefone fixo com DDD (10 dígitos)', () => {
    expect(formatPhone('1134567890')).toBe('(11) 3456-7890')
  })

  it('formata número de celular com DDD (11 dígitos)', () => {
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
  })

  it('remove caracteres não numéricos', () => {
    expect(formatPhone('(11) 98765-4321')).toBe('(11) 98765-4321')
  })

  it('retorna vazio se input for vazio', () => {
    expect(formatPhone('')).toBe('')
  })

  it('trunca se tiver mais de 11 dígitos', () => {
    expect(formatPhone('11987654321999')).toBe('(11) 98765-4321')
  })
})
