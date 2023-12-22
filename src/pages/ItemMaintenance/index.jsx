import { h, Component } from 'preact';
import ReactPaginate from 'react-paginate';
import Search from '../../components/Search';
import { 
  ButtonDefault,
  ButtonNoBorder
} 
from '../../components/Button';
import Loader from '../../components/Loader';
import ItemsModal from '../../components/Modals/ItemsModal';
import {
  fetchDataFromAPI,
  fetchLocalStorage,
  deleteData
} from '../../../helpers';
import {
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline'
import { 
  apiEndpointKey,
  searchColumns,
  itemsPerPage,
  navigations
} from './data'

class ItemMaintenance extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filteredItems: [],
      currentPage: 0,
      loading: true,
      showModal: false,
      dataForEdit: null,
      isEditing: false
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleDelete = (id) => {
    deleteData(id, apiEndpointKey)
  }
  
  componentDidMount() {
    this.fetchData();
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
    this.setState({ 
      showModal: false,
      isEditing: false
    });
  };

  
  async fetchData(){
    const itemsStorageData = fetchLocalStorage(apiEndpointKey);
    
    if (!itemsStorageData) {
      await fetchDataFromAPI(apiEndpointKey).then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({
      items: fetchLocalStorage(apiEndpointKey),
      filteredItems: fetchLocalStorage(apiEndpointKey),
      loading: false
    })
  }

  componentDidUpdate() {
    window.addEventListener('storage', () => {
      this.setState({
        items: fetchLocalStorage(apiEndpointKey),
        filteredItems: fetchLocalStorage(apiEndpointKey)
      })
    })
  }

  render({ }, { filteredItems, loading, currentPage, showModal }) {
    // loading = true;
    if(loading) {
      return <Loader />
    }

    if (!filteredItems) {
      return null;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredItems.slice(startIndex, endIndex);

    return (
      <div class="ItemMaintenance relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
          <Search
            data={this.state.items}
            setSearchResults={this.setSearchResults}
            searchColumns={searchColumns}
            searchPlaceHolder="Search Items Here..."
          />
          <ButtonDefault text="Add Item" handleOnClick={this.openModal}/>
          <ItemsModal
            isOpen={showModal}
            onClose={this.closeModal}
            cb={this.closeModal}
            dataForEdit={this.state.dataForEdit}
            isEditing={this.state.isEditing}
          />
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
          <thead class="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
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
                {/* Actions */}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              currentData.map((item, index) => (
                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-slate-50 hover:bg-gray-50">
                  <td class="px-6 py-4">
                    {item.itemName}
                  </td>
                  <td class="px-6 py-4">
                    {item.itemCode}
                  </td>
                  <td class="px-6 py-4">
                    {item.class_name}
                  </td>
                  <td class="px-6 py-4">
                    {item.cost}
                  </td>
                  <td class="px-6 py-4">
                    {item.retailCost}
                  </td>
                  <td class="px-6 py-4">
                    {item.techPrice}
                  </td>
                  <td class="px-6 py-4">
                    {item.stock}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <ButtonNoBorder 
                      text="Edit" 
                      handleOnClick={()=>{
                        this.openModal()
                        this.setState({
                          dataForEdit: item,
                          isEditing: true
                        })
                      }}
                      color="green"
                      addClass="mr-2"
                    />
                    <ButtonNoBorder 
                      text="Delete" 
                      handleOnClick={() => this.handleDelete(item.id)}
                      color="red"
                    />
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
