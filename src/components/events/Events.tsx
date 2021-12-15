
import { Events as EventsModel } from '../../models/Events'

import EventCard from "./EventCard"
import './style.scss'

function Events(props: { events: Array<object> , singleEventsCallback: (obj:EventsModel)=>void}) {
  console.log(props.events)
  function handleClick(event_data:EventsModel) {
    console.log('Event Callback')
    return props.singleEventsCallback(event_data)
  }

  return (
    <>
      <section className="events-wrapper">
        {props.events.map((item: any) => (
          <EventCard key={item.id} event_item={item} eventCallback={handleClick}/>
        ))}
      </section>
    </>
  )
}

export default Events
