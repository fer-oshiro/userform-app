// src/utils/validators.test.ts
import { isValidPhone } from './phone'

describe('isValidPhone', () => {
  it('aceita números com e sem formatação', () => {
    expect(isValidPhone('11999999999')).toBe(true)
    expect(isValidPhone('(11) 99999-9999')).toBe(true)
    expect(isValidPhone('(11) 3456-7890')).toBe(true)
  })

  it('rejeita se tiver letras ou menos dígitos', () => {
    expect(isValidPhone('11asd999999')).toBe(false)
    expect(isValidPhone('11999')).toBe(false)
    expect(isValidPhone('abc(11) 99999-9999')).toBe(false)
  })
})
