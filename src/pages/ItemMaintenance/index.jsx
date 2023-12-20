import { h, Component } from 'preact';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';
import Search from '../../components/Search';
import ItemsModal from '../../components/Modals/ItemsModal';
import {
  fetchDataFromAPI,
  fetchLocalStorage
} from '../../../helpers';
import {
  ArrowsUpDownIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'

class ItemMaintenance extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filteredItems: [],
      itemsPerPage: 12,
      currentPage: 0,
      loading: true,
      showModal: false,
      searchColumns: [
        'itemName',
        'itemCode',
        'classification'
      ],
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidUpdate() {
    window.addEventListener('storage', () => {
      this.setState({
        items: fetchLocalStorage('items'),
        filteredItems: fetchLocalStorage('items')
      })
    })
  }

  async componentDidMount() {
    const isReady = fetchLocalStorage('items');
    if (!isReady) {
      await fetchDataFromAPI('items').then(() => {
        this.setState({ loading: false });
      });
    }

    const items = fetchLocalStorage('items');

    this.setState({
      items: items,
      filteredItems: items,
      loading: false
    })
  }

  handlePageChange(selectedPage) {
    this.setState({
      currentPage: selectedPage.selected,
    });
  }

  setSearchResults = (results) => {
    this.setState({
      filteredItems: results,
      currentPage: 0
    });
  };

 

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render({ }, { filteredItems, loading, searchColumns, itemsPerPage, currentPage, showModal }) {
    if (loading) {
      return <div>Fetching Data...</div>;
    }

    if (!filteredItems) {
      return null;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredItems.slice(startIndex, endIndex);

    const navigations = [
      'Product name',
      'Item Code',
      'Classification',
      'Cost',
      'Retail Cost',
      'Tech Price',
      'Stock',
    ]

    return (
      <div class="ItemMaintenance relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
          <Search
            data={this.state.items}
            setSearchResults={this.setSearchResults}
            searchColumns={searchColumns}
            searchPlaceHolder="Search Items Here..."
          />
          <button onClick={this.openModal} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Item</button>
          <ItemsModal
            isOpen={showModal}
            onClose={this.closeModal}
            cb={this.closeModal}
          />
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {navigations.map((item) => (
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    {item}
                    <a href="#">
                      <ArrowsUpDownIcon className="h-4 w-4 pl-1 text-blue-500" />
                    </a>
                  </div>
                </th>
              ))}
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              currentData.map((i, index) => (
                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-4">
                    {i.itemName}
                  </td>
                  <td class="px-6 py-4">
                    {i.itemCode}
                  </td>
                  <td class="px-6 py-4">
                    {i.classification}
                  </td>
                  <td class="px-6 py-4">
                    {i.cost}
                  </td>
                  <td class="px-6 py-4">
                    {i.retailCost}
                  </td>
                  <td class="px-6 py-4">
                    {i.techPrice}
                  </td>
                  <td class="px-6 py-4">
                    {i.stock}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a href="#" >
                      <PencilSquareIcon className="h-6 w-6 text-blue-500 hover:text-blue-800" />
                    </a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <ReactPaginate
          pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={this.handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    );
  }
}

export default ItemMaintenance;
