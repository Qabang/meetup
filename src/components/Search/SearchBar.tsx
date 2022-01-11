import { Search as SearchModel } from '../../models/Search'
import { GoSearch } from 'react-icons/go';
import './style.scss'

function SearchBar({ searchValue, setSearchValue }: SearchModel) {
  return (
    <div className='search-wrapper'>
      <input
        className="search-input"
        placeholder="Serach event"
        data-test="input-search-field"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <GoSearch className='search-icon' />
    </div>
  )
}
export default SearchBar
