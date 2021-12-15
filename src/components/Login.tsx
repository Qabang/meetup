import { useState } from 'react'
import { Users } from '../models/Users'

function Login(props: { loggedIn: (bool: boolean, obj: object) => void, users:Users }) {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const local_storage_users: string | null = localStorage.getItem('users')
  const users = useState(local_storage_users !== null ? JSON.parse(local_storage_users):[props.users])
 

  function submitLogin() {
    const validUsername = users[0].filter((user:any) => user.username === username)
    const validPassword = users[0].filter((user:any) => user.password === password)

    if (validPassword.length > 0 && validUsername.length > 0) {
      setError('')
      props.loggedIn(
        true,
        users[0].filter((user:any) => user.username === username)[0]
      )
    } else {
      setError('Fel användarnamn eller lösenord')
    }
  }
  return (
    <>
      <label>Username</label>
      <input
        id="inputUsername"
        data-test="input-field-login"
        type="text"
        placeholder="Användarnamn"
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password</label>
      <input
        id="inputPassword"
        data-test="input-field-login"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" data-test="login-btn" onClick={submitLogin}>
        Logga in
      </button>
      {error && <div data-test="error-msg-container">{error}</div>}
    </>
  )
}

export default Login
