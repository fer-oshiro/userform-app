import { User } from '@/schema/user.schema'
import { deleteUser, getUsers } from '@/services/userStorage'
import { formatCPF, formatPhone } from '@/utils/masks'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const onEdit = async (user: User) => {
    navigate('/cadastro', {
      state: {
        name: user.name,
        email: user.email,
        cpf: formatCPF(user.cpf),
        phone: formatPhone(user.phone),
      },
    })
  }

  const onDelete = async (cpf: string) => {
    await deleteUser(cpf)
    toast.success('Usuário excluído com sucesso!')
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Usuários</h1>
      <table className={styles.table}>
        <caption className="sr-only">Lista de usuários cadastrados</caption>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">CPF</th>
            <th scope="col">Telefone</th>
            <th scope="col">E-mail</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.cpf}>
              <td>{user.name}</td>
              <td>{formatCPF(user.cpf)}</td>
              <td>{formatPhone(user.phone)}</td>
              <td>{user.email}</td>
              <td className={styles.actions}>
                <button type="button" onClick={() => onEdit(user)}>
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(user.cpf)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                Nenhum usuário encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
