import { useState } from 'react'
import { Users } from '../../models/Users'
import './style.scss'


function Login(props: { loggedIn: (obj: object) => void, users: Users }) {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const local_storage_users = localStorage.getItem('users')
  const users = useState(local_storage_users !== null ? JSON.parse(local_storage_users) : [props.users])


  function submitLogin() {
    const validUsername = users[0].filter((user: any) => user.username === username)
    const validPassword = users[0].filter((user: any) => user.password === password)

    if (validPassword.length > 0 && validUsername.length > 0) {
      setError('')
      props.loggedIn(
        users[0].filter((user: any) => user.username === username)[0]
      )
    } else {
      setError('Fel användarnamn eller lösenord')
    }
  }
  return (
    <div className="login-wrapper">
      <label>Username</label>
      <input
        id="inputUsername"
        data-test="input-field-login"
        type="text"
        placeholder="username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password</label>
      <input
        id="inputPassword"
        data-test="input-field-login"
        type="password"
        placeholder='password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" data-test="login-btn" className='login-btn' onClick={submitLogin}>
        Logga in
      </button>
      {error && <div className="error-msg" data-test="error-msg-container">{error}</div>}
    </div>
  )
}

export default Login
