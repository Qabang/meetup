import { useEffect, useState } from 'react'
import { Events as EventsModel } from '../../models/Events'
import ErrorMsg from './ErrorMsg'
import './style.scss'

function AddEvent() {
  const [isOnline, setIsOnline] = useState('')
  const [errors, setErrors] = useState<Array<string>>([])
  const [hasErrors, setHasErrors] = useState(errors.length > 0)
  const [event, setEvent] = useState<EventsModel>()
  const todaysDate = new Date().toISOString().split('T', 1)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [participants, setParticipants] = useState(0)
  const [city, setCity] = useState('')
  const [adress, setAdress] = useState('')

  useEffect(() => {
    if (event) {
      const events = localStorage.getItem('events')
      let parsedEvents
      if (events) {
        parsedEvents = JSON.parse(events)

        const filteredEvents = parsedEvents.filter((item: any) => item.id === event.id)

        console.log(filteredEvents.length)
        if (filteredEvents.length < 1) {
          parsedEvents.push(event)
          localStorage.setItem('events', JSON.stringify(parsedEvents))
        }
      }

    }
  }, [event])


  // Check date format.
  function isValidDate(dateString: string) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/
    if (!dateString.match(regEx)) return false // Invalid format
    var d = new Date(dateString)
    var dNum = d.getTime()
    if (!dNum && dNum !== 0) return false // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString
  }

  // Validate form data and set new event.
  function handleSubmit() {
    let err = []
    let randomId = new Date().getMilliseconds() + Math.floor(Math.random() * 100)
    let eventData: EventsModel = {
      id: randomId,
      name: name,
      date: date,
      time_start: timeStart,
      time_end: timeEnd,
      image: image,
      description: description,
      participants: participants,
      location: {
        city: city,
        adress: adress,
        other: isOnline,
      },
      comments: [],
    }

    // Loop through object and see if values are valid
    for (const [key, value] of Object.entries(eventData)) {
      if (key === 'location') {
        if (value.other === '' && value.city === '') {
          err.push('city: can not be empty')
        }
        if (value.other === '' && value.adress === '') {
          err.push('adress: can not be empty')
        }
      }
      // Check date format.
      if (key === 'date' && value !== '') {
        const valid = isValidDate(value)

        if (!valid) {
          err.push('Date: You need to enter a valid date, YYYY-mm-dd')
        }
      }

      // Check end time to be AFTER start time.
      if (key === 'time_end' && value !== '' && eventData.date !== '') {
        let validDate = isValidDate(eventData.date)
        if (validDate) {
          if (eventData.time_start !== '') {
            let timestring_end = new Date(eventData.date + 'T' + value).valueOf()
            let timestring_start = new Date(eventData.date + 'T' + eventData.time_start).valueOf()

            if (timestring_end < timestring_start || value === eventData.time_start) {
              err.push("Time: The events end time can't be before or the same as it's start time (" + eventData.time_start + ')')
            }
          }
        }
      }

      // Check that required fields not are empty.
      if (value === '') {
        if (key !== 'image') {
          let label = key
          if (key === 'time_start') {
            label = 'start'
          } else if (key === 'time_end') {
            label = 'end'
          }
          err.push(label + ': can not be empty')
        }
      }
    }

    if (err.length > 0) {
      setErrors(err)
    } else {
      setEvent(eventData)
    }
    setHasErrors(err.length > 0)
  }

  return (
    <section className="add-event-wrapper">
      <h2>Add Event</h2>
      <form data-test="add-event-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Name
          <input
            data-test="event-title"
            name="title"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Date
          <input
            data-test="event-date"
            name="date"
            min={todaysDate[0]}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Time:
          <div>
            <label>
              Starts
              <input
                data-test="event-time-start"
                name="time-start"
                min={todaysDate[1]}
                type="time"
                onChange={(e) => setTimeStart(e.target.value)}
              />
            </label>
            <label>
              Ends
              <input
                data-test="event-time-end"
                name="time-end"
                min={timeStart ? timeStart : todaysDate[1]}
                type="time"
                onChange={(e) => setTimeEnd(e.target.value)}
              />
            </label>
          </div>
        </label>
        <label>
          Description
          <textarea
            data-test="event-description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
          />
        </label>
        <label>
          Number of participants
          <input
            data-test="event-participants"
            name="participants"
            type="number"
            min={1}
            onChange={(e) => setParticipants(parseInt(e.target.value))}
          />
        </label>
        <label>
          Image
          <input
            data-test="event-image"
            name="image"
            type="text"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label className="radios">
          Is this an online event?
          <div>
            <label>
              Yes
              <input
                data-test="event-location"
                name="location"
                value="Online"
                onChange={(event) => setIsOnline(event.target.value)}
                type="radio"
              />
            </label>
            <label>
              No
              <input
                data-test="event-location"
                name="location"
                value=""
                type="radio"
                onChange={(event) => setIsOnline(event.target.value)}
              />
            </label>
          </div>
        </label>
        {!isOnline && (
          <>
            <label>
              City
              <input
                data-test="event-city"
                name="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
            </label>

            <label>
              Adress
              <input
                data-test="event-adress"
                name="adress"
                type="text"
                onChange={(e) => setAdress(e.target.value)}
              />
            </label>
          </>
        )}

        <input
          data-test="event-submit"
          name="submit"
          type="submit"
          value="Submit Event"
          onClick={handleSubmit}
        />
      </form>
      {hasErrors && <ErrorMsg errors={errors} />}
      {event && <div>Event has been added successfully!</div>}
    </section>
  )
}

export default AddEvent
