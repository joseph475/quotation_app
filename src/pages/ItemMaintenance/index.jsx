// @ts-nocheck
import { h, Component } from 'preact';
import ReactPaginate from 'react-paginate';
import {
  ButtonDefault,
  Search,
  PromptModal,
  Loader
} from '@components';
import {
  fetchDataFromAPI,
  fetchLocalStorage,
  deleteData,
  tbl_items
} from '@helpers';
import {
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline'
import {
  searchColumns,
  itemsPerPage,
  tableColumns
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
      isEditing: false,
      isPromptModalOpen: false,
      idForDeletion: null,

      // LazyLoadedComponents
      ItemsModal: null
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  loadItemsModal = async () => {
    const module = await import('../../components/Modals/AddItemsModal');
    const ItemsModal = module.default;

    this.setState({
      ItemsModal,
    });
  };

  handleDelete = (id) => {
    this.setState({
      isPromptModalOpen: true,
      idForDeletion: id
    })
  }

  handleYes = () => {
    deleteData(this.state.idForDeletion, tbl_items)
  };

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
    this.loadItemsModal()
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      isEditing: false,
    });
  };

  async fetchData() {
    const itemsStorageData = fetchLocalStorage(tbl_items);

    if (!itemsStorageData) {
      await fetchDataFromAPI(tbl_items).then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({
      items: fetchLocalStorage(tbl_items),
      filteredItems: fetchLocalStorage(tbl_items),
      loading: false
    })
  }

  componentDidUpdate() {
    window.addEventListener('storage', () => {
      this.setState({
        items: fetchLocalStorage(tbl_items),
        filteredItems: fetchLocalStorage(tbl_items)
      })
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  render({ }, { filteredItems, loading, currentPage, showModal, isPromptModalOpen, ItemsModal }) {
    // loading = true;
    if (loading) {
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
          <ButtonDefault text="Add Item" handleOnClick={this.openModal} />
          {ItemsModal &&
            <ItemsModal
              isOpen={showModal}
              onClose={this.closeModal}
              cb={this.closeModal}
              dataForEdit={this.state.dataForEdit}
              isEditing={this.state.isEditing}
            />
          }
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
          <thead class="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tableColumns.map((item) => (
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
                    <ButtonDefault
                      text="Edit"
                      handleOnClick={() => {
                        this.openModal()
                        this.setState({
                          dataForEdit: item,
                          isEditing: true
                        })
                      }}
                      className="mr-2 text-green-600"
                    />
                    <ButtonDefault
                      text="Delete"
                      handleOnClick={() => this.handleDelete(item.id)}
                      className="text-red-600"
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

        <PromptModal
          isOpen={isPromptModalOpen}
          onClose={() => this.setState({ isPromptModalOpen: false })}
          onYes={this.handleYes}
        />
      </div>
    );
  }
}

export default ItemMaintenance;
