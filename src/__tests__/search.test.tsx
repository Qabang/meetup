import { render } from '@testing-library/react'
import { mount, shallow } from 'enzyme'
import SearchBar from '../components/Search/SearchBar'
import eventsTestData from '../components/events/events-testdata.json'
import Events from '../components/events/Events'
import { BrowserRouter as Router } from 'react-router-dom'


describe('Tests for Search', () => {
  test('Should render the Searchbar Component', () => {
    render(<SearchBar searchValue='' setSearchValue={jest.fn()} />)
  })

  test('Should render an input field of type text', () => {
    const wrapper = shallow(<SearchBar searchValue='' setSearchValue={jest.fn()} />)
    expect(wrapper.find('input[data-test="input-search-field"]').length).toBe(1)
    expect(wrapper.find('input[data-test="input-search-field"]').type()).toBe('input')
  })

  test('Search "Mountain Climbing", should render 0 events', () => {
    const wrapper = mount(
      <Router><Events events={eventsTestData} singleEventsCallback={jest.fn()} /></Router>
    );
    const searchText = "Mountain Climbing";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(0);
  });

  test('Search "Lorem ipsum", should render 1 events', () => {
    const wrapper = mount(
      <Router><Events events={eventsTestData} singleEventsCallback={jest.fn()} /></Router>
    );
    const searchText = "Lorem Ipsum";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(1);
  });

  test('Search on "LOrEm IpSuM", should render 1 events', () => {
    const wrapper = mount(
      <Router><Events events={eventsTestData} singleEventsCallback={jest.fn()} /></Router>
    );
    const searchText = "LOrEm IpSuM";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(1);
  });

  test('Search on "G??teborg", should render 2 events with the location set to G??teborg', () => {
    const wrapper = mount(
      <Router><Events events={eventsTestData} singleEventsCallback={jest.fn()} /></Router>
    );
    const searchText = "g??teborg";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(2);
  });

  test('Search on "ipsum", should render 2 events with the one with ipsum in the title and one with ipsum in the desription', () => {
    const wrapper = mount(
      <Router><Events events={eventsTestData} singleEventsCallback={jest.fn()} /></Router>
    );
    const searchText = "ipsum";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(2);

    expect(wrapper.find('[data-test="search-results-wrapper"]').children().last().text()).toContain('ipsum');
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().first().text()).not.toContain('ipsum');
  });
})
