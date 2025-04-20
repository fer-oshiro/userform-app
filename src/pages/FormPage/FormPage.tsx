import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

import style from './FormPage.module.scss'

export const FormPage = () => {
  return (
    <div className={style.wrapper}>
      <h1>Formulário</h1>
      <Input name="name" placeholder="Nome completo (sem abreviações)" label="Nome Completo" />
      <Button isLoading>Cadastrar</Button>
    </div>
  )
}
