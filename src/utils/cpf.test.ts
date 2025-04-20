import { isValidCPF } from './cpf'

describe('isValidCPF', () => {
  it('retorna false para CPF com dígitos iguais', () => {
    expect(isValidCPF('000.000.000-00')).toBe(false)
    expect(isValidCPF('00000000000')).toBe(false)
  })

  it('retorna false para CPF inválido', () => {
    expect(isValidCPF('123.456.789-00')).toBe(false)
  })

  it('retorna false para CPF com letras misturadas', () => {
    expect(isValidCPF('529.982.24ss7-25')).toBe(false)
  })

  it('retorna true para CPF válido', () => {
    expect(isValidCPF('529.982.247-25')).toBe(true)
    expect(isValidCPF('52998224725')).toBe(true)
  })
})
