export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/\D/g, '')
  return /^\d{10,11}$/.test(cleaned) && !/[a-zA-Z]/.test(value)
}

export function sanitizePhone(value: string): string {
  return value.replace(/\D/g, '')
}
