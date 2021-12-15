import React, { useEffect, useState } from 'react'
import {Users} from './models/Users'
import Login from './components/Login'
import Events from './components/events/Events'
import EventsData from './components/events/events-data.json'
import './App.css'

import {
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import LoginContext from './contexts/LoginContext'
import EventItem from './components/EventItem'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeUser, setActiveUser] = useState<Users>({username: '', role:'', events:[]})
   
  let navigate = useNavigate();

  function handleIsLoggedIn(bool: boolean, user: any) {
    setIsLoggedIn(bool)
    setActiveUser(user)
  }

  function handleSingleEventDetails(event_data:any) {
    navigate(`/event/${event_data.id}`, { replace: true });
  }

  function handleJoinEvent(id:number) {
    let user = activeUser
    user.events.push(id)
    setActiveUser(user)
  }

  return (
    <div className="App">
      <LoginContext.Provider value={activeUser}>
        <header className="App-header">
          <nav>
            <NavLink to="/"> Start</NavLink> |
            {activeUser.username}
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
                element={<Events events={EventsData} singleEventsCallback={handleSingleEventDetails}/>}
              ></Route>)}
              <Route
                path="/event/:id"
                element={<EventItem events={EventsData} joinEvent={handleJoinEvent}/>}
              ></Route>
          </Routes>
        </section>
      </LoginContext.Provider>
    </div>
  )
}

export default App
