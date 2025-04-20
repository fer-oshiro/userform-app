import { z } from 'zod'
import { isValidCPF } from '@/utils/cpf'
import { isValidPhone, sanitizePhone } from '@/utils/phone'

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .refine((name) => name.split(' ').length > 1, {
      message: 'Nome deve conter pelo menos um sobrenome',
    }),

  cpf: z
    .string()
    .refine(isValidCPF, { message: 'CPF inválido' })
    .transform((val) => val.replace(/\D/g, '')),

  phone: z
    .string()
    .refine(isValidPhone, {
      message: 'Telefone deve conter DDD, números e nenhum caractere inválido',
    })
    .transform(sanitizePhone),

  email: z.string().email({ message: 'E-mail inválido' }),
})

export type UserSchema = z.infer<typeof userSchema>
