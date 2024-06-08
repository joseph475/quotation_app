import { h, Component, render } from 'preact';
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };

    this.searchInput = null;
  }

  handleSearchChange = (event) => {
    const {data, searchColumns, setSearchResults } = this.props

    this.setState({ searchQuery: event.target.value });

    const searchTerm = event.target.value.toLowerCase();
    const filteredData = data.filter((item) =>
      searchColumns.some(
        (column) => item[column].toLowerCase().includes(searchTerm)
      )
    );
    setSearchResults(filteredData, event.target.value);
  };

  clearSearch = () => {
    const {data, setSearchResults } = this.props;
    this.setState({ searchQuery: '' });
    setSearchResults(data);
  };

  render({ searchPlaceHolder }) {
    return (
      <div class="bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-blue-500" />
          </div>
          <input
            type="text"
            id="table-search"
            value={this.state.searchQuery}
            onInput={this.handleSearchChange}
            placeholder={searchPlaceHolder}
            ref={(input) => (this.searchInput = input)}
            class="block py-[9px] ps-10 text-sm text-gray-900 border
             border-gray-300 rounded-lg bg-gray-50
              focus:ring-blue-500 focus:border-blue-500 sm:w-[300px] w-[220px]"
          />
        </div>
      </div>
    );
  }
}

export default SearchComponent;
