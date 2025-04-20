import { User } from '@/schema/user.schema'
import { useEffect, useState } from 'react'
import { getUsers } from '@/services/userStorage'

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Usuários</h1>
      <p>Listagem de usuários</p>
      <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: 8 }}>
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  )
}
