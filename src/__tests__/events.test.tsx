import { render, screen } from '@testing-library/react'
import { mount, shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

import EventCard from '../components/events/EventCard'
import Events from '../components/events/Events'

import eventsTestData from '../components/events/events-testdata.json'
import LoginContext from '../contexts/LoginContext'
import { Users } from '../models/Users'

const mockOnClick = jest.fn()

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

describe('test for events at startpage "/"', () => {
  test('Renders Events component', () => {
    render(<Router><Events events={eventsTestData} singleEventsCallback={jest.fn()} /></Router>)
  })

  test('Renders EventCard component', () => {
    render(
      <EventCard event_item={eventsTestData[0]} eventCallback={mockOnClick} />
    )
  })

  test('EventCard Component should render the meetup event name of the first event "Lorem ipsum"', () => {
    render(
      <EventCard event_item={eventsTestData[0]} eventCallback={mockOnClick} />
    )
    expect(screen.getByText(eventsTestData[0].name)).toBeInTheDocument()
  })

  test('EventCard Component should NOT render the meetup event name of the last event "Progrmmer Girls night - online event"', () => {
    render(
      <EventCard event_item={eventsTestData[0]} eventCallback={mockOnClick} />
    )
    expect(screen.queryByText(eventsTestData[6].name)).not.toBeInTheDocument()
  })

  test('EventCard should render the event name, "Progrmmer Girls night - online event",  in an h2 element', () => {
    const wrapper = shallow(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    expect(wrapper.find('h2').text()).toBe(eventsTestData[6].name)
  })

  test('EventCard should render the event name at a length of 25 characters', () => {
    const wrapper = mount(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    expect(wrapper.find('h2').text().length).toBe(25)
  })

  test('Events Component should render the meetup event name of the first event"Lorem ipsum" and the last event "Programmer Girls night - online event"', () => {
    render(<Router><Events events={eventsTestData} singleEventsCallback={jest.fn()} /></Router>)
    // Title is tested for 25 characters.
    const title_0 = eventsTestData[0].name.match(/[\s\S]{1,22}/g) || []
    const title_6 = eventsTestData[0].name.match(/[\s\S]{1,22}/g) || []

    expect(screen.getByText(title_0[0])).toBeInTheDocument()
    expect(screen.getByText(title_6[0])).toBeInTheDocument()
  })

  test('EventCard should render the default event image, "the logo" as a background image,  for events missing an image url', () => {
    const wrapper = shallow(
      <EventCard event_item={eventsTestData[1]} eventCallback={mockOnClick} />
    )
    expect(
      wrapper.find('[data-test="image-container"]').props().style
    ).toHaveProperty('backgroundImage', 'url("/logo192.png")')
  })

  test('EventCard should render the event image as a background image', () => {
    const wrapper = shallow(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    expect(
      wrapper.find('[data-test="image-container"]').props().style
    ).toHaveProperty('backgroundImage', 'url("/images/girl-code.jpg")')
  })

  test('EventCard should render a read more button', () => {
    const wrapper = mount(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    expect(wrapper.find('[data-test="read-more-btn"]').length).toBe(1)
  })

  test('EventCard should render a button with the text "Read more', () => {
    const wrapper = mount(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    expect(wrapper.find('[data-test="read-more-btn"]').text()).toBe('Read more')
  })

  test('EventCard should render the date of the event', () => {
    const wrapper = mount(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    expect(wrapper.find('[data-test="event-date"]').text()).toBe('04-08-2022')
  })

  test('EventCard should render the place of the event', () => {
    const wrapper = mount(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    expect(wrapper.find('[data-test="event-location"]').text()).toBe('Online')
  })

  test('EventCard trigger function on click on read more button.', () => {
    const wrapper = mount(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )

    const btn = wrapper.find('[data-test="read-more-btn"]')
    btn.simulate('click')
    expect(mockOnClick.mock.calls.length).toBe(1)
  })

  test('EventCard trigger function on click on read more button. It should return event object', () => {
    const wrapper = mount(
      <EventCard event_item={eventsTestData[6]} eventCallback={mockOnClick} />
    )
    const btn = wrapper.find('[data-test="read-more-btn"]')
    btn.simulate('click')
    expect(mockOnClick.mock.calls[0][0]).toEqual(eventsTestData[6])
  })

  test('EventCard Read more function should trigger useNavigate in react-router-dom.', () => {
    const activeUser: Users = {
      username: 'TestUser',
      password: '',
      role: 'user',
      events: [1],
    }

    const mockHandleClick = () => mockedUsedNavigate()

    const app = mount(
      <Router>
        <LoginContext.Provider value={activeUser}>
          <Events
            events={eventsTestData}
            singleEventsCallback={mockHandleClick}
          />
        </LoginContext.Provider>
      </Router>
    )

    const childbtn = app.find('[data-test="read-more-btn"]').first()
    childbtn.simulate('click')
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
  })

  test('Component Events should only render the same number of events as items in users events array at "/user/events"', () => {
    const activeUser = {
      username: 'Sandra',
      password: 'admin123',
      role: 'admin',
      events: [1, 5, 2],
    }
    const wrapper = mount(<Router><Events events={eventsTestData.filter((event) => (activeUser.events.includes(event.id)))} singleEventsCallback={jest.fn()} /></Router>)
    expect(wrapper.find('[data-test="event-card-wrapper"]').length).toBe(activeUser.events.length)

  })
})
