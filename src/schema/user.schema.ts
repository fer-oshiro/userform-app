import { z } from 'zod'
import { isValidCPF } from '@/utils/cpf'
import { isValidPhone, sanitizePhone } from '@/utils/phone'

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Campo deve conter 3 caracteres ou mais' })
    .refine((name) => name.split(' ').length > 1, {
      message: 'Campo deve conter nome e sobrenome',
    }),

  cpf: z
    .string()
    .refine(isValidCPF, { message: 'Campo inválido: CPF' })
    .transform((val) => val.replace(/\D/g, '')),

  phone: z
    .string()
    .refine(isValidPhone, {
      message: 'Campo deve conter DDD, números válidos e nenhum caractere inválido',
    })
    .transform(sanitizePhone),

  email: z.string().email({ message: 'Campo deve conter um e-mail válido' }),
})

export type User = z.infer<typeof userSchema>
