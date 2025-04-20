import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { User, userSchema } from '@/schema/user.schema'
import { saveUser } from '@/services/userStorage'
import style from './FormPage.module.scss'
import { toast } from 'sonner'

export const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: User) => {
    try {
      await saveUser(data)
      toast.success('Usuário adicionado com sucesso!')
    } catch (error: unknown) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message ?? 'Erro ao adicionar usuário')
      }
    }
  }

  return (
    <div className={style.container}>
      <form className={style.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h1>Formulário</h1>
        <Input
          label="Nome Completo (sem abreviações)"
          type="text"
          inputMode="text"
          error={errors.name?.message}
          {...register('name', { required: true })}
        />
        <Input
          label="E-mail"
          type="email"
          inputMode="email"
          error={errors.email?.message}
          {...register('email', { required: true })}
        />
        <Input
          label="CPF"
          mask="cpf"
          type="tel"
          inputMode="numeric"
          error={errors.cpf?.message}
          {...register('cpf', { required: true })}
        />
        <Input
          label="Telefone"
          mask="phone"
          type="tel"
          inputMode="numeric"
          error={errors.phone?.message}
          className={style.input}
          {...register('phone', { required: true })}
        />
        <Button type="submit" isLoading={isSubmitting} disabled={!isValid} isFullWidth>
          Cadastrar
        </Button>
      </form>
    </div>
  )
}
