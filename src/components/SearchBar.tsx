import { Search as SearchModel } from '../models/Search'

function SearchBar({ searchValue, setSearchValue }: SearchModel) {
  return (
    <input
      placeholder="Serach event title"
      data-test="input-search-field"
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
    />
  )
}
export default SearchBar
