import { render, screen } from '@testing-library/react'
import { mount, shallow } from 'enzyme'
import AddEvent from '../components/addEvent/AddEvent'

/*Function that formats a time string HH:mm and adds h hours from now.*/
function formatTime(h: number) {
  let time = new Date().getTime();
  const time_milliseconds = new Date(time + (h * 60 * 60 * 1000))
  const time_h = time_milliseconds.getHours()
  const time_min = (time_milliseconds.getMinutes() < 10 ? '0' : '') + time_milliseconds.getMinutes()
  return time_h + ':' + time_min
}

const mockEvents = [
  {
    id: 1,
    name: 'Html and CSS fun facts you might not know',
    date: '17-06-2022',
    time_start: '15:00',
    time_end: '16:30',
    description:
      "Can you slack it to me? idea shower. Circle back. Agile who's responsible for the ask for this request? i don't want to drain the whole swamp, i just want to shoot some alligators or crank this out i'll book a meeting so we can solution this before the sprint is over. Pre launch viral engagement, and get buy-in for high-level we need to touch base off-line before we fire the new ux experience. What's our go to market strategy? powerpoint Bunny, nor product launch big picture not a hill to die on. Run it up the flagpole.",
    participants: 65,
    location: {
      city: 'Malmö',
      adress: 'Examplestrasse 1',
      other: '',
    },
    comments: [],
  }]
describe('Test for AddEvent on route "/add/event"', () => {
  beforeAll(() => {
    localStorage.setItem('events', JSON.stringify(mockEvents))
  })
  afterAll(() => {
    localStorage.clear()
  })

  test('Should render AddEvent Component', () => {
    render(<AddEvent />)
  })

  test('Should render the text "Add event"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Add event/i)).toBeInTheDocument()
  })

  test('Should render text "Name"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Name/i)).toBeInTheDocument()
  })

  test('Should render text "Date"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Date/i)).toBeInTheDocument()
  })

  test('Should render text "Starts"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Starts/i)).toBeInTheDocument()
  })

  test('Should render text "Time:"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Time:/i)).toBeInTheDocument()
  })

  test('Should render text "Ends"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Ends/i)).toBeInTheDocument()
  })

  test('Should render text "Description"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Description/i)).toBeInTheDocument()
  })

  test('Should render text "Image"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Image/i)).toBeInTheDocument()
  })

  test('Should render text "Is this an online event?"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Is this an online event\?/i)).toBeInTheDocument()
  })

  test('Should render text "Number of participants"', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Number of participants/i)).toBeInTheDocument()
  })

  test('Should render text "City" if not online event', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Name/i)).toBeInTheDocument()
  })

  test('Should render text "Adress" if not online event', () => {
    render(<AddEvent />)
    expect(screen.getByText(/Name/i)).toBeInTheDocument()
  })

  test('Should render a form element with data-test attribute add-event-form', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('[data-test="add-event-form"]').length).toBe(1)
    expect(wrapper.find('[data-test="add-event-form"]').type()).toBe('form')
  })

  test('Form element should call preventDefault on submit', () => {
    const wrapper = shallow(<AddEvent />)
    const preventDefault = jest.fn()
    const form = wrapper.find('[data-test="add-event-form"]')

    form.simulate('submit', { preventDefault });

    expect(preventDefault.mock.calls.length).toBe(1)
  })

  test('Should render an input element with data-test attribute event-title', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('[data-test="event-title"]').length).toBe(1)
    expect(wrapper.find('[data-test="event-title"]').type()).toBe('input')
  })

  test('Should render an textarea element with data-test attribute event-description', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('[data-test="event-description"]').length).toBe(1)
    expect(wrapper.find('[data-test="event-description"]').type()).toBe(
      'textarea'
    )
  })

  test('Should render an input element with data-test attribute event-date-time of type date', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('input[data-test="event-date"]').length).toBe(1)
    expect(wrapper.find('input[data-test="event-date"]').prop('type')).toBe(
      'date'
    )
  })

  test('Should render an input element with data-test attribute event-time-start of type time', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('input[data-test="event-time-start"]').length).toBe(1)
    expect(
      wrapper.find('input[data-test="event-time-start"]').prop('type')
    ).toBe('time')
  })

  test('Should render an input element with data-test attribute event-time-end of type time', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('input[data-test="event-time-end"]').length).toBe(1)
    expect(wrapper.find('input[data-test="event-time-end"]').prop('type')).toBe(
      'time'
    )
  })

  test('Should render 2 input element with data-test attribute event-location of type radio', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('input[data-test="event-location"]').length).toBe(2)
    expect(
      wrapper.find('input[data-test="event-location"]').first().prop('type')
    ).toBe('radio')
    expect(
      wrapper.find('input[data-test="event-location"]').last().prop('type')
    ).toBe('radio')
  })

  test('Should render an input element with data-test attribute event-city', () => {
    const wrapper = shallow(<AddEvent />)
    let radio = wrapper.find('input[data-test="event-location"]').first()
    radio.simulate('change', { target: { value: '' } })
    expect(wrapper.find('[data-test="event-city"]').length).toBe(1)
    expect(wrapper.find('[data-test="event-city"]').type()).toBe('input')
  })

  test('Should render an input element with data-test attribute event-adress', () => {
    const wrapper = shallow(<AddEvent />)
    let radio = wrapper.find('input[data-test="event-location"]').first()
    radio.simulate('change', { target: { value: '' } })
    expect(wrapper.find('[data-test="event-adress"]').length).toBe(1)
    expect(wrapper.find('[data-test="event-adress"]').type()).toBe('input')
  })

  test('Should render an input element with data-test attribute event-submit', () => {
    const wrapper = shallow(<AddEvent />)
    expect(wrapper.find('[data-test="event-submit"]').length).toBe(1)
    expect(wrapper.find('[data-test="event-submit"]').type()).toBe('input')
  })

  test('Click on submit without any data in form fields should generate error continer element containing string "name: can not be empty"', () => {
    const expectedText = 'name: can not be empty'

    const wrapper = mount(<AddEvent />)
    const button = wrapper.find('[data-test="event-submit"]')
    expect(button.length).toBe(1)
    button.simulate('click')
    expect(wrapper.text().includes(expectedText)).toBe(true)
  })

  test('Click on submit with data in required form fields should generate success continer element containing string "Event has been added successfully!"', () => {
    const date = new Date().toISOString().split('T', 1)[0]
    const startTime = formatTime(1)
    const endTime = formatTime(3)
    const expectedText = 'Event has been added successfully!'
    const wrapper = mount(<AddEvent />)
    const button = wrapper.find('[data-test="event-submit"]')
    const formInputElements = wrapper.find('form').children().find('input')
    const formTeaxtareaElement = wrapper.find('form').children().find('textarea')
    formTeaxtareaElement.simulate('change', { target: { value: 'Lorem ipsum......' } })

    formInputElements.forEach((elem) => {
      if (elem.prop('name') === 'participants') {
        elem.simulate('change', { target: { value: 10 } })
      } else if (elem.prop('name') === 'location') {
        elem.simulate('change', { target: { value: 'Online' } })
      } else if (elem.prop('name') === 'date') {
        elem.simulate('change', { target: { value: date } })
      } else if (
        elem.prop('name') === 'time-start'
      ) {
        elem.simulate('change', { target: { value: startTime } })
      }
      else if (elem.prop('name') === 'time-end') {
        elem.simulate('change', { target: { value: endTime } })
      } else {
        elem.simulate('change', { target: { value: 'Random Nonsens' } })
      }
    })

    button.simulate('click')

    expect(wrapper.text().includes(expectedText)).toBe(true)
  })

  test('Click on submit with data in required form fields BUT invalid date format should generate error string', () => {
    const expectedText = 'Date: You need to enter a valid date, YYYY-mm-dd'
    const badDate = '111111111-11-11'

    const wrapper = mount(<AddEvent />)
    const button = wrapper.find('[data-test="event-submit"]')
    const formInputElements = wrapper.find('form').children().find('input')
    const formTeaxtareaElement = wrapper.find('form').children().find('textarea')
    formTeaxtareaElement.simulate('change', { target: { value: 'Lorem ipsum......' } })

    formInputElements.forEach((elem) => {
      let time = new Date().toISOString().split('T', 1)

      if (elem.prop('name') === 'participants') {
        elem.simulate('change', { target: { value: 10 } })
      } else if (elem.prop('name') === 'location') {
        elem.simulate('change', { target: { value: 'Online' } })
      } else if (elem.prop('name') === 'date') {
        elem.simulate('change', { target: { value: badDate } })
      } else if (
        elem.prop('name') === 'time-start' ||
        elem.prop('name') === 'time-end'
      ) {
        elem.simulate('change', { target: { value: time[1] } })
      } else {
        elem.simulate('change', { target: { value: 'Random Nonsens' } })
      }
    })

    button.simulate('click')

    expect(wrapper.text().includes(expectedText)).toBe(true)
  })

  test('Click on submit with data in required form fields BUT invalid date, using letters, should generate error string', () => {
    const expectedText = 'Date: You need to enter a valid date, YYYY-mm-dd'
    const badDate = 'abcd-ef-gh'

    const wrapper = mount(<AddEvent />)
    const button = wrapper.find('[data-test="event-submit"]')
    const formInputElements = wrapper.find('form').children().find('input')
    const formTeaxtareaElement = wrapper.find('form').children().find('textarea')
    formTeaxtareaElement.simulate('change', { target: { value: 'Lorem ipsum......' } })

    formInputElements.forEach((elem) => {
      let time = new Date().toISOString().split('T', 1)

      if (elem.prop('name') === 'participants') {
        elem.simulate('change', { target: { value: 10 } })
      } else if (elem.prop('name') === 'location') {
        elem.simulate('change', { target: { value: 'Online' } })
      } else if (elem.prop('name') === 'date') {
        elem.simulate('change', { target: { value: badDate } })
      } else if (
        elem.prop('name') === 'time-start' ||
        elem.prop('name') === 'time-end'
      ) {
        elem.simulate('change', { target: { value: time[1] } })
      } else {
        elem.simulate('change', { target: { value: 'Random Nonsens' } })
      }
    })

    button.simulate('click')

    expect(wrapper.text().includes(expectedText)).toBe(true)
  })
  test('Click on submit with data in required form fields BUT invalid end time value, should generate error string', () => {
    const date = new Date().toISOString().split('T', 1)[0]
    const startTime = formatTime(2)
    const endTime = formatTime(1)
    const expectedText = "Time: The events end time can't be before or the same as it's start time (" + startTime + ")"

    const wrapper = mount(<AddEvent />)
    const button = wrapper.find('[data-test="event-submit"]')
    const formInputElements = wrapper.find('form').children().find('input')
    const formTeaxtareaElement = wrapper.find('form').children().find('textarea')
    formTeaxtareaElement.simulate('change', { target: { value: 'Lorem ipsum......' } })

    formInputElements.forEach((elem) => {

      if (elem.prop('name') === 'participants') {
        elem.simulate('change', { target: { value: 10 } })
      } else if (elem.prop('name') === 'location') {
        elem.simulate('change', { target: { value: 'Online' } })
      } else if (elem.prop('name') === 'date') {
        elem.simulate('change', { target: { value: date } })
      } else if (
        elem.prop('name') === 'time-start'
      ) {
        elem.simulate('change', { target: { value: startTime } })
      }
      else if (elem.prop('name') === 'time-end') {
        elem.simulate('change', { target: { value: endTime } })
      } else {
        elem.simulate('change', { target: { value: 'Random Nonsens' } })
      }
    })

    button.simulate('click')

    expect(wrapper.text().includes(expectedText)).toBe(true)
  })
})
