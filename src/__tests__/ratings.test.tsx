import { mount, shallow } from 'enzyme'
import { render } from '@testing-library/react'
import Rating from '../components/ratings/Rating'
import Comment from '../components/ratings/Comment'
import Points from '../components/ratings/Points'

//Needed to mock react-router-dom in tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/event/1' }),
}))

const mockComments = [
  {
    points: 40,
    comment:
      "Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits.",
    author: 'Jeff',
  },
  {
    points: 100,
    comment:
      "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.",
    author: 'Ruby',
  },
]

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
    comments: mockComments,
  },
  {
    id: 2,
    name: 'Programmer Girls night - online event',
    date: '04-08-2022',
    time_start: '15:00',
    time_end: '16:30',
    image: 'images/girl-code.jpg',
    description:
      'Are creatures of the cosmos across the centuries tesseract rogue corpus callosum courage of our questions. A mote of dust suspended in a sunbeam colonies a still more glorious dawn awaits network of wormholes hundreds of thousands at the edge of forever. Vastness is bearable only through love vastness is bearable only through love invent the universe inconspicuous motes of rock and gas preserve and cherish that pale blue dot intelligent beings and billions upon billions upon billions upon billions upon billions upon billions upon billions.',
    participants: 150,
    location: {
      city: '',
      adress: '',
      other: 'online',
    },
    comments: mockComments,
  },
]

describe('Tests for ratings on events', () => {
  beforeAll(() => {
    localStorage.setItem('events', JSON.stringify(mockEvents))
    window.scrollTo = jest.fn()
  })
  afterAll(() => {
    localStorage.clear()
  })
  test('Renders Ratings Component', () => {
    render(<Rating comments={mockComments} />)
  })

  test('Should render component Comment', () => {
    render(
      <Comment
        commentValue={mockComments[0].comment}
        setCommentValue={jest.fn()}
      />
    )
  })

  test('Should render component Points', () => {
    render(
      <Points
        readOnly={false}
        pointValue={mockComments[0].points}
        setPointValue={jest.fn()}
      />
    )
  })

  test('Comment should be a child to Ratings component', () => {
    const wrapper = shallow(<Rating comments={mockComments} />)
    expect(wrapper.find(Comment).length).toBe(1)
  })

  test('Comment Component should have an textarea element, expects to find only one textarea element', () => {
    const wrapper = mount(<Rating comments={mockComments} />)
    expect(wrapper.find('textarea').length).toBe(1)
  })

  test('Points should be a child to Ratings component', () => {
    const wrapper = shallow(<Rating comments={[]} />)
    expect(wrapper.find(Points).length).toBe(1)
  })

  test('Should render the first Points component with readonly set to false child to Rating component', () => {
    const wrapper = shallow(<Rating comments={mockComments} />)
    expect(wrapper.find(Points).first().prop('readOnly')).toBe(false)
  })

  test('Should render the Points components with readonly set to true if they are not the first Points child to Rating component', () => {
    const wrapper = shallow(<Rating comments={mockComments} />)
    wrapper.find(Points).forEach((child, i) => {
      // The first child should not be tested in this test.
      if (i === 0) {
        return
      }

      expect(child.prop('readOnly')).toBe(true)
    })
  })

  test('Ratings component should have a submit button, Should be a button element', () => {
    const wrapper = shallow(<Rating comments={mockComments} />)
    expect(wrapper.find('button[data-test="submit-rating"]').length).toBe(1)
    expect(wrapper.find('button[data-test="submit-rating"]').prop('type')).toBe(
      'submit'
    )
  })

  test('Click on submit rating button without any data in comment field should generate error string', () => {
    const wrapper = shallow(<Rating comments={mockComments} />)
    const btn = wrapper.find('button[data-test="submit-rating"]')
    btn.simulate('click')
    expect(wrapper.find('[data-test="error-msg"]').text()).toEqual(
      'You have to write a comment'
    )
  })

  test('Click on submit rating button with the text "Hello" in the comment field, Should getItems localstorage and setItem from localstorage should be called', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem')
    jest.spyOn(window.localStorage.__proto__, 'setItem')

    const wrapper = mount(<Rating comments={mockComments} />)
    const btn = wrapper.find('button[data-test="submit-rating"]')
    const commentField = wrapper.find('textarea')
    const amount_of_comments = wrapper.find('[data-test="comments-wrapper"]').children().length

    commentField.simulate('change', { target: { value: 'Hello' } })
    btn.simulate('click')
    expect(localStorage.getItem).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(wrapper.find('[data-test="comments-wrapper"]').children().length).toBeGreaterThan(amount_of_comments)
  })

  test('Click on Points component, should return value', () => {
    const mockOnClick = jest.fn()
    const wrapper = shallow(<Points
      readOnly={false}
      pointValue={0}
      setPointValue={mockOnClick}
    />)

    wrapper.children().first().simulate('click', 100)

    expect(mockOnClick.mock.calls.length).toBe(1)
    expect(mockOnClick.mock.calls[0][0]).toEqual(100)

  })
})
