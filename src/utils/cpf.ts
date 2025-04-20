export function isValidCPF(cpf: string): boolean {
  if (!/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
    return false
  }
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  const base = cpf.slice(0, 9)
  const digit1 = calcCheckDigit(base, 10)
  const digit2 = calcCheckDigit(base + digit1, 11)

  return cpf.endsWith(`${digit1}${digit2}`)
}

const calcCheckDigit = (base: string, factor: number) => {
  let sum = 0
  for (let i = 0; i < base.length; i++) {
    sum += parseInt(base[i]) * (factor - i)
  }
  const result = (sum * 10) % 11
  return result === 10 ? 0 : result
}
