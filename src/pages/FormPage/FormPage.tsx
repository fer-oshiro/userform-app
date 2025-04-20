import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

import style from './FormPage.module.scss'

export const FormPage = () => {
  return (
    <div className={style.wrapper}>
      <h1>Formulário</h1>
      <Input name="name" label="Nome Completo (sem abreviações)" type="text" inputMode="text" />
      <Input name="email" label="E-mail" type="email" inputMode="email" />
      <Input
        name="cpf"
        label="CPF"
        mask="cpf"
        type="tel"
        inputMode="numeric"
        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
      />
      <Input
        name="phone"
        label="Telefone"
        mask="phone"
        type="tel"
        inputMode="numeric"
        pattern="\d{10,11}"
      />
      <Button>Cadastrar</Button>
    </div>
  )
}
