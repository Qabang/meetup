import { useEffect, useState } from 'react'
import { Events as EventsModel } from '../../models/Events'
import SearchBar from '../SearchBar'
import EventCard from './EventCard'
import './style.scss'

function Events(props: {
  events: Array<object>
  singleEventsCallback: (obj: EventsModel) => void
}) {
  const [searchText, setSearchText] = useState('')
  const [filteredEvents, setFilteredEvents] = useState(props.events)

  useEffect(() => {
    let events = props.events.filter(
      (item: any) =>
        item.name.match(new RegExp(searchText, 'i')) ||
        item.description.match(new RegExp(searchText, 'i')) ||
        item.location.city.match(new RegExp(searchText, 'i')) ||
        item.location.other.match(new RegExp(searchText, 'i'))
    )

    let sorted_events = events.sort(function (a: any, b: any) {
      return (
        new Date(
          a.date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
        ).valueOf() -
        new Date(
          b.date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
        ).valueOf()
      )
    })
    setFilteredEvents(sorted_events)
  }, [searchText])

  function handleClick(event_data: EventsModel) {
    return props.singleEventsCallback(event_data)
  }

  return (
    <>
      <SearchBar searchValue={searchText} setSearchValue={setSearchText} />
      <section className="events-wrapper" data-test="search-results-wrapper">
        {filteredEvents.map((item: any) => (
          <EventCard
            key={item.id}
            event_item={item}
            eventCallback={handleClick}
          />
        ))}
      </section>
    </>
  )
}

export default Events
