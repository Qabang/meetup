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
    id: '8',
  }),
  useRouteMatch: () => ({ url: '/event/8' }),
}))

describe('test for "/event/8"', () => {
  test('Join button should not be visible/accesible if event date has passed. Should display text "Event has already taken place"', () => {

    const activeUser: Users = {
      username: 'TestUser',
      password: '',
      role: 'user',
      events: [],
    }

    const wrapper = mount(
      <LoginContext.Provider value={activeUser}>
        <Router>
          <EventItem events={eventsTestData} joinEvent={jest.fn()} />
        </Router>
      </LoginContext.Provider>
    )

    expect(wrapper.find('[data-test="join-btn"]').length).toBe(0)
    expect(wrapper.find('[data-test="event-passed"]').length).toBe(1)
    expect(wrapper.find('[data-test="event-passed"]').text()).toEqual(
      expect.stringMatching(/This event has already taken place./i)
    )
  })
})
