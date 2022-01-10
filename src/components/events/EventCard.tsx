import { useEffect, useState } from 'react'
import { Events as EventsModel } from '../../models/Events'

function EventCard(props: { event_item: EventsModel, eventCallback: (item_data: EventsModel) => void, isVisible?: boolean }) {
  const event_item = props.event_item
  const image = event_item.image ? event_item.image : 'logo192.png'
  const [title, setTitle] = useState(event_item.name)

  let place = event_item.location.city ? event_item.location.city : event_item.location.other
  place = place && place.charAt(0).toUpperCase() + place.slice(1)

  const isOldEvent = new Date(event_item.date).valueOf() > new Date().valueOf()
  const showCard = props.isVisible || isOldEvent


  useEffect(() => {
    if (event_item.name.length > 24) {
      let short_name = event_item.name.match(/[\s\S]{1,22}/g) || []
      setTitle(short_name[0].trim() + '...')
    }
  }, [event_item.name])


  return (
    <>
      <section className={showCard ? isOldEvent ? 'event-card' : 'event-card old' : isOldEvent ? '' : 'event-card hidden'} data-test="event-card-wrapper">
        {showCard && 'Visible'}
        {isOldEvent && 'OLD'}
        <h2>{title}</h2>
        <div
          className="image-container"
          data-test="image-container"
          style={{ backgroundImage: `url("/${image}")` }}
        >
        </div>
        <div>
          <span data-test="event-date">{event_item.date}</span>
          <span data-test="event-location">{place && place}</span>
        </div>
        <div>
          <button data-test="read-more-btn" onClick={() => (props.eventCallback(event_item))}>Read more</button>
        </div>
      </section>
    </>
  )
}

export default EventCard
