export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/\D/g, '')
  return (cleaned.length === 10 || cleaned.length === 11) && !/[a-zA-Z]/.test(value)
}

export function sanitizePhone(value: string): string {
  return value.replace(/\D/g, '')
}
