import { UserForm } from './components/Form'
import { User } from '@/schema/user.schema'
import { editUser, saveUser } from '@/services/userStorage'
import { toast } from 'sonner'
import styles from './FormPage.module.scss'
import { useLocation, useNavigate } from 'react-router'

export const FormPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const initialData = location.state as User | undefined

  const handleSave = async (data: User) => {
    try {
      if (initialData) {
        await editUser(data)
        toast.success('Usuário atualizado com sucesso!')
      } else {
        await saveUser(data)
        toast.success('Usuário cadastrado com sucesso!')
      }
      navigate('/usuarios')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Erro desconhecido')
      }
      console.error('Error saving user:', error)
    }
  }

  return (
    <div className={styles.container}>
      <UserForm initialData={initialData} onSubmit={handleSave} />
    </div>
  )
}
