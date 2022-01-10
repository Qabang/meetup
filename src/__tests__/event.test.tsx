import { configure, render, screen } from '@testing-library/react'
import { mount, shallow } from 'enzyme'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'

import EventItem from '../components/eventItem/EventItem'
import eventsTestData from '../components/events/events-testdata.json'
import LoginContext from '../contexts/LoginContext'
import { Users } from '../models/Users'


//Needed to mock react-router-dom in tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/event/1' }),
}))

describe('Tests for single event "/event/:id"', () => {
  test('Component EventItem is rendered', () => {
    render(
      <Router>
        <EventItem events={eventsTestData} joinEvent={jest.fn()} />
      </Router>
    )
  })

  test('Component should render the event title', () => {
    const expected = eventsTestData[0].name
    render(
      <Router>
        <EventItem events={eventsTestData} joinEvent={jest.fn()} />
      </Router>
    )
    expect(screen.queryByText(expected)).toBeInTheDocument()
  })

  test('Component should render the event location', () => {
    const expected = eventsTestData[0].location.city
    render(
      <Router>
        <EventItem events={eventsTestData} joinEvent={jest.fn()} />
      </Router>
    )
    expect(screen.queryByText(expected)).toBeInTheDocument()
  })

  test('Component should render the event start end end time like 00:00 - 01:00', () => {
    const expected =
      eventsTestData[0].time_start + ' - ' + eventsTestData[0].time_end
    render(
      <Router>
        <EventItem events={eventsTestData} joinEvent={jest.fn()} />
      </Router>
    )
    expect(screen.queryByText(expected)).toBeInTheDocument()
  })

  test('Component should render a button element with the text Join', () => {
    const wrapper = mount(
      <Router>
        <EventItem events={eventsTestData} joinEvent={jest.fn()} />
      </Router>
    )
    expect(wrapper.find('[data-test="join-btn"]').type()).toBe('button')
    expect(wrapper.find('[data-test="join-btn"]').text()).toEqual(
      expect.stringMatching(/Join/i)
    )
  })

  test('Join button should trigger function on click. It should return event id', () => {
    const mockOnClick = jest.fn()
    const wrapper = mount(
      <Router>
        <EventItem events={eventsTestData} joinEvent={mockOnClick} />
      </Router>
    )
    const btn = wrapper.find('[data-test="join-btn"]')
    btn.simulate('click')
    expect(mockOnClick.mock.calls.length).toBe(1)
    expect(mockOnClick.mock.calls[0][0]).toEqual(eventsTestData[0].id)
  })

  test('Join function should reduce amount by 1 of the total in participants.', () => {
    const wrapper = mount(
      <Router>
        <EventItem events={eventsTestData} joinEvent={jest.fn()} />
      </Router>
    )
    const amount = eventsTestData[0].participants
    const btn = wrapper.find('[data-test="join-btn"]')
    expect(wrapper.find('[data-test="event-capacity"]').text()).toBe(
      amount + ' of ' + amount
    )
    btn.simulate('click')
    expect(wrapper.find('[data-test="event-capacity"]').text()).toBe(
      amount - 1 + ' of ' + amount
    )
  })

  test('Join button should not be visible/accesible if user has already joined event. Should display text "Already Joined this Event"', () => {
    const activeUser: Users = {
      username: 'TestUser',
      password: '',
      role: 'user',
      events: [1],
    }

    const wrapper = mount(
      <LoginContext.Provider value={activeUser}>
        <Router>
          <EventItem events={eventsTestData} joinEvent={jest.fn()} />
        </Router>
      </LoginContext.Provider>
    )
    expect(wrapper.find('[data-test="join-btn"]').length).toBe(0)
    expect(wrapper.find('[data-test="event-joined"]').length).toBe(1)
    expect(wrapper.find('[data-test="event-joined"]').text()).toEqual(
      expect.stringMatching(/Already joined this event/i)
    )
  })
})
