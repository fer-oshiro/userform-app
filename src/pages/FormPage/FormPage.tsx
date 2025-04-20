import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

import style from './FormPage.module.scss'

export const FormPage = () => {
  return (
    <div className={style.wrapper}>
      <h1>Formulário</h1>
      <Input name="name" label="Nome Completo (sem abreviações)" />
      <Input name="email" label="E-mail" />
      <Input name="cpf" label="CPF" />
      <Input name="phone" label="Telefone" />
      <Button>Cadastrar</Button>
    </div>
  )
}
