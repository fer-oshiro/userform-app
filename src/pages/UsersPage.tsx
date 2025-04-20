import { useEffect, useState } from 'react'
import { fetchRemoteUsers } from '../services/user'

export const UsersPage = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const data = await fetchRemoteUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    getUsers()
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
