import { useContext, useEffect, useState } from 'react'
import LoginContext from '../../contexts/LoginContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Events as EventsModel } from '../../models/Events'
import { Users as UsersModel } from '../../models/Users'
import Rating from '../ratings/Rating'
import { HiClock, HiCalendar } from 'react-icons/hi';
import { FaMapPin } from 'react-icons/fa';
import { GrPersonalComputer } from 'react-icons/gr';
import './style.scss'


function EventItem(props: { events: Array<EventsModel>, joinEvent: (id: number) => void }) {
  const { id } = useParams()
  const event_item = props.events.filter((item) => item.id.toString() === id)[0]
  const isOldEvent = new Date(event_item.date).valueOf() > new Date().valueOf()
  const [participants, setParticipants] = useState<UsersModel[]>([])
  const user = useContext(LoginContext)
  const [canJoin, setCanJoin] = useState(
    participants.filter((person) => person.username === user.username).length <
    1
  )

  const [image, setImage] = useState(event_item.image || 'logo.png')
  const image_url = (image.indexOf("http://") === 0 || image.indexOf("https://") === 0) ? image : `/${image}`
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('activeUser')) {
      navigate('/');
    }

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
        <div className='event-info'>
          <span data-test="event-location">
            {event_item.location.city
              ? event_item.location.city
              : event_item.location.other}
          </span>
          <span data-test="event-date">{event_item.date}</span>
          <span>
            Available seats:
            <span data-test="event-capacity" className='capacity'>
              {`${event_item.participants - participants.length} of ${event_item.participants}`}
            </span>
          </span>
        </div>
        <div
          className="image-container"
          data-test="image-container"
          style={{ backgroundImage: `url("${image_url}")` }}
        ></div>
        <section>
          <h3>Description</h3>
          {event_item.description}
        </section>
        <section>
          <h3>Join Event</h3>
          <div>
            <h4>When?</h4>
            <HiClock />
            <span>
              {event_item.time_start} - {event_item.time_end}
            </span>
            <br />
            <HiCalendar />
            <span>{event_item.date}</span>
            <br />
            <br />
            <h4>Where? </h4>

            {event_item.location.adress && <span><FaMapPin className='pin' />{event_item.location.adress}<br /></span>}

            {event_item.location.city
              ? <span className='event-city'>{event_item.location.city}</span>
              : <span><GrPersonalComputer className="computer" />{event_item.location.other}</span>
            }
          </div>
          {canJoin && isOldEvent && (
            <button
              data-test="join-btn"
              className="join-btn"
              onClick={() => handleJoinEvent()}
            >
              Join this event
            </button>
          )}
          {canJoin && !isOldEvent && (<div data-test="event-passed" className="event-passed">This event has already taken place.</div>)}

          {!canJoin && <div data-test="event-joined" className="event-joined">Already Joined this event!</div>}
        </section>
        <section>
          <h3>Ratings</h3>
          <Rating comments={event_item.comments} />
        </section>
      </section>
    </>
  )
}

export default EventItem
