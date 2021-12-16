import { render } from '@testing-library/react'
import {mount, shallow} from 'enzyme'
import SearchBar from '../components/SearchBar'
import eventsTestData from '../components/events/events-testdata.json'
import Events from '../components/events/Events'


describe('Tests for Search', ()=>{
  test('Should render the Searchbar Component', ()=>{
    render(<SearchBar searchValue='' setSearchValue={jest.fn()}/>)
  })

  test('Should render an input field of type text', ()=>{
    const wrapper = shallow(<SearchBar searchValue='' setSearchValue={jest.fn()}/>)
    expect(wrapper.find('input[data-test="input-search-field"]').length).toBe(1)
    expect(wrapper.find('input[data-test="input-search-field"]').type()).toBe('input')
  })

  test('Search "Mountain Climbing", should render 0 events', () => {
    const wrapper = mount(
    <Events events={eventsTestData} singleEventsCallback={jest.fn()} />
    );
    const searchText = "Mountain Climbing";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(0);
  });

  test('Search "Lorem ipsum", should render 1 events', () => {
    const wrapper = mount(
    <Events events={eventsTestData} singleEventsCallback={jest.fn()} />
    );
    const searchText = "Lorem Ipsum";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(1);
  });

  test('Search on "LOrEm IpSuM", should render 1 events', () => {
    const wrapper = mount(
    <Events events={eventsTestData} singleEventsCallback={jest.fn()} />
    );
    const searchText = "LOrEm IpSuM";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(1);
  });

  test('Search on "Göteborg", should render 2 events with the location set to Göteborg', () => {
    const wrapper = mount(
    <Events events={eventsTestData} singleEventsCallback={jest.fn()} />
    );
    const searchText = "göteborg";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(2);
  });
  
  test('Search on "ipsum", should render 2 events with the one with ipsum in the title and one with ipsum in the desription', () => {
    const wrapper = mount(
    <Events events={eventsTestData} singleEventsCallback={jest.fn()} />
    );
    const searchText = "ipsum";
    const searchField = wrapper.find('[data-test="input-search-field"]');

    searchField.simulate("change", { target: { value: searchText } });
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().length).toBe(2);
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().first().text()).toContain('ipsum');
    expect(wrapper.find('[data-test="search-results-wrapper"]').children().last().text()).not.toContain('ipsum');
  });
})
