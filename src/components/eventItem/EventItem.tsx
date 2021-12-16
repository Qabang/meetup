import { useContext, useEffect, useState } from 'react'
import LoginContext from '../../contexts/LoginContext'
import { useParams } from 'react-router-dom'
import { Events as EventsModel } from '../../models/Events'
import { Users as UsersModel } from '../../models/Users'

function EventItem(props: { events: Array<EventsModel>, joinEvent: (id:number) => void}) {
  const { id } = useParams()
  const event_item = props.events.filter((item) => item.id.toString() === id)[0]
  const [participants, setParticipants] = useState<UsersModel[]>([])
  const user = useContext(LoginContext)
  const [canJoin, setCanJoin] = useState(
    participants.filter((person) => person.username === user.username).length <
      1
  )
  const [image, setImage] = useState(event_item.image || 'logo192.png')
  
  useEffect(() => {  
    setCanJoin(
      user.events.filter((id) => id === event_item.id)
        .length < 1
    )
  }, [participants])

  function handleJoinEvent() {
    setParticipants([...participants, user])
    props.joinEvent(event_item.id)
  }

  return (
    <>
      <section className="event-item">
        <h2>{event_item.name}</h2>
        <div>
          <span data-test="event-location">
            {event_item.location.city
              ? event_item.location.city
              : event_item.location.other}
          </span>
          <span data-test="event-date">{event_item.date}</span>
          <span data-test="event-capacity">
            {`${event_item.participants - participants.length} of ${event_item.participants}`}
          </span>
        </div>
        <div
          className="image-container"
          data-test="image-container"
          style={{ backgroundImage: `url("/${image}")` }}
        ></div>
        <section>
          <h3>Description</h3>
          {event_item.description}
        </section>
        <section>
          <h3>Join Event</h3>
          <div>
            When?
            <br />
            <span>
              {event_item.time_start} - {event_item.time_end}
            </span>
            <br />
            <span>{event_item.date}</span>
            <br />
            <br />
            Where? <br />
            {event_item.location.adress && event_item.location.adress}
            <br />
            {event_item.location.city
              ? event_item.location.city
              : event_item.location.other}
          </div>
          {canJoin && (
            <button
              data-test="join-btn"
              onClick={()=>handleJoinEvent()}
            >
              Join this event
            </button>
          )}
          {!canJoin && <span data-test="event-joined">Already Joined this event!</span>}
        </section>
        <section>
          <h3>Ratings</h3>
        </section>
      </section>
    </>
  )
}

export default EventItem
