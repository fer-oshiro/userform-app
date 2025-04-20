const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function fetchRemoteUsers() {
  return fetch(`${API_URL}/users`).then((res) => res.json())
}
