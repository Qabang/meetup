import React, { useState } from 'react'
import {Users} from './models/Users'
import Login from './components/Login'
import './App.css'

import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeUser, setActiveUser] = useState<Users>({username: '', password:'', role:''})

  function handleIsLoggedIn(bool: boolean, user: any) {
    setIsLoggedIn(bool)
    setActiveUser(user)
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <NavLink to="/"> Start</NavLink> |
          </nav>
        </header>
        <section className="main-content">
          <Routes>
            {!isLoggedIn && (
              <Route
                path="/"
                element={<Login loggedIn={handleIsLoggedIn} />}
              ></Route>
              )}
              {isLoggedIn && (<Route
                path="/"
                element={<div>Hello {activeUser.username}</div>}
              ></Route>)}
          </Routes>
        </section>
      </Router>
    </div>
  )
}

export default App
