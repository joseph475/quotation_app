import { h } from 'preact';
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

const Search = ({ data, setSearchResults, searchColumns, searchPlaceHolder = "Search..." }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = data.filter((item) =>
      searchColumns.some(
        (column) => item[column].toLowerCase().includes(searchTerm)
      )
    );
    setSearchResults(filteredData);
  };

  return (
    <div class="bg-white dark:bg-gray-900">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="h-4 w-4 text-blue-500" />
        </div>
        <input 
          type="text" 
          id="table-search"
          placeholder= {searchPlaceHolder}
          onKeyUp={handleSearch}
          class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
      </div>
    </div>
  );
}
export default Search;
