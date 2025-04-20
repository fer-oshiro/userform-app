import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { User, userSchema } from '@/schema/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../FormPage.module.scss'

interface UserFormProps {
  initialData?: User
  onSubmit: (data: User) => Promise<void>
}

export const UserForm = ({ initialData, onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    mode: 'onTouched',
    defaultValues: initialData,
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({
        name: '',
        email: '',
        cpf: '',
        phone: '',
      })
    }
  }, [initialData, reset])

  console.log('initialData', initialData)

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <h1>{initialData ? 'Editar Usuário' : 'Cadastrar Usuário'}</h1>

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
        disabled={!!initialData}
      />

      <Input
        label="Telefone"
        mask="phone"
        type="tel"
        inputMode="numeric"
        error={errors.phone?.message}
        {...register('phone', { required: true })}
      />

      <Button type="submit" isLoading={isSubmitting} disabled={!isValid} isFullWidth>
        {initialData ? 'Salvar Alterações' : 'Cadastrar'}
      </Button>
    </form>
  )
}
