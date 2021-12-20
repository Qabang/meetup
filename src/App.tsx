import React, { useEffect, useState } from 'react'
import { Users } from './models/Users'
import Login from './components/login/Login'
import Events from './components/events/Events'
import EventsData from './components/events/events-data.json'
import { ReactComponent as Logo } from './logo.svg'
import { ReactComponent as LogoLarge } from './logo-large.svg'
// import './App.css'
import './assets/styles/main.scss'

import {
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import LoginContext from './contexts/LoginContext'
import EventItem from './components/eventItem/EventItem'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeUser, setActiveUser] = useState<Users>({ username: '', role: '', events: [] })
  const [events, setEvents] = useState(localStorage.getItem('events') != null ? localStorage.getItem('events') : '[{}]')

  let navigate = useNavigate();
  const usersData: Users[] = [
    {
      username: 'John',
      password: 'password123',
      role: 'user',
      events: [],
    },
    {
      username: 'Alex',
      password: 'password123',
      role: 'user',
      events: [],
    },
    {
      username: 'Ruby',
      password: 'password123',
      role: 'user',
      events: [],
    },
    {
      username: 'Sandra',
      password: 'admin123',
      role: 'admin',
      events: [],
    },
    {
      username: 'David',
      password: 'admin123',
      role: 'admin',
      events: [],
    },
  ]

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(usersData))
    }

    if (!localStorage.getItem('events')) {
      localStorage.setItem('events', JSON.stringify(EventsData))
      setEvents(localStorage.getItem('events'))
    } else if (localStorage.getItem('events')) {
      setEvents(localStorage.getItem('events'))
    }
  }, [localStorage.getItem('events'), localStorage.getItem('users')])

  function handleIsLoggedIn(bool: boolean, user: any) {
    setIsLoggedIn(bool)
    setActiveUser(user)
  }

  function handleSingleEventDetails(event_data: any) {
    navigate(`/event/${event_data.id}`, { replace: true });
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setActiveUser({ username: '', role: '', events: [] })
    navigate(`/`, { replace: true });
  }

  function handleJoinEvent(id: number) {
    let user = activeUser
    user.events.push(id)
    setActiveUser(user)
    const local_storage_users = localStorage.getItem('users') !== null ? localStorage.getItem('users') : '{}'
    if (local_storage_users !== null) {
      let tmp_users = JSON.parse(local_storage_users)
      let obj_index = tmp_users.findIndex((item: any) => (item.username === user.username))
      if (obj_index) {
        tmp_users[obj_index] = activeUser
        localStorage.setItem('users', JSON.stringify(tmp_users))
      }
    }
  }

  return (
    <div className="App">
      <LoginContext.Provider value={activeUser}>
        {isLoggedIn && (<header className="App-header">
          <Logo />
          <nav>
            <NavLink to="/"> Start</NavLink> |
            <NavLink to="/user/events"> Joined Meetups {activeUser.events.length}</NavLink> |
            <button className="navlink" onClick={handleLogout}>Logout {activeUser.username}</button>
          </nav>
        </header>)
        }
        {!isLoggedIn && (<header><LogoLarge /></header>)}
        <section className="main-content">
          <Routes>
            {!isLoggedIn && (
              <Route
                path="/"
                element={<Login loggedIn={handleIsLoggedIn} users={JSON.parse(localStorage.getItem('users') || '[{}]')} />}
              ></Route>
            )}
            {isLoggedIn && (<Route
              path="/"
              element={<Events events={JSON.parse(events || '')} singleEventsCallback={handleSingleEventDetails} />}
            ></Route>)}
            <Route
              path="/event/:id"
              element={<EventItem events={JSON.parse(events || '')} joinEvent={handleJoinEvent} />}
            ></Route>
            <Route
              path="/user/events"
              element={<Events events={JSON.parse(events || '').filter((event: any) => (activeUser.events.includes(event.id)))} singleEventsCallback={handleSingleEventDetails} />}
            ></Route>
          </Routes>
        </section>
      </LoginContext.Provider>
    </div>
  )
}

export default App
