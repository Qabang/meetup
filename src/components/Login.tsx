import { useState } from 'react'
import { Users } from '../models/Users'

function Login(props: {loggedIn: (bool: boolean, obj:object)=>void;} ) {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const users: Users[] = [
    {
      username: 'John',
      password: 'password123',
      role: 'user',
      events: []
    },
    {
      username: 'Alex',
      password: 'password123',
      role: 'user',
      events: []
    },
    {
      username: 'Ruby',
      password: 'password123',
      role: 'user',
      events: []
    },
    {
      username: 'Sandra',
      password: 'admin123',
      role: 'admin',
      events: []
    },
    {
      username: 'David',
      password: 'admin123',
      role: 'admin',
      events: []
    },
  ]

  function submitLogin() {
    const validUsername = users.filter((user) => user.username === username)
    const validPassword = users.filter((user) => user.password === password)

    if (validPassword.length > 0 && validUsername.length > 0) {
      setError('')
      props.loggedIn(true, users.filter((user) => user.username === username)[0])
    } else {
      setError('Fel användarnamn eller lösenord')
    }
  }
  return (
    <>
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
    </>
  )
}

export default Login
