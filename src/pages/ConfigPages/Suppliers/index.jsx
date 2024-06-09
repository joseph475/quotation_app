// @ts-nocheck
import { h, Component, render } from 'preact';
import {
  ButtonDefault,
  Search,
  PromptModal,
  Loader,
  Table
} from '@components';
import {
  fetchDataFromAPI,
  fetchLocalStorage,
  storeData,
  validateForm,
  deleteData,
  tbl_suppliers
} from '@helpers';
import {
  requiredFields,
  searchColumns,
  itemsPerPage,
  displayedColumns 
} from './data'

class Suppliers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: [],
      filteredItems: [],
      currentPage: 0,
      loading: true,
      isPromptModalOpen: false,
      idForDeletion: null,
      showModal: false,
      itemForUpdate: null,
      SuppliersModal: null,
    };

  }

  // loadSuppliersModal = async () => {
  //   const module = await import('../../../components/Modals/AddSuppliersModal');
  //   const SuppliersModal = module.default;

  //   this.setState({
  //     SuppliersModal,
  //   });
  // };

  // openModal = () => {
  //   this.setState({ showModal: true });
  //   this.loadSuppliersModal()
  // };

  // closeModal = () => {
  //   this.setState({
  //     showModal: false,
  //     isEditing: false
  //   });
  // };

  setSearchResults = (results, searchQuery) => {
    this.setState({
      filteredItems: results,
      searchQuery
    });
  };

  handleChange = (event) => {
    const { rowIndex, colName } = this.state.editingCell;
    const { value } = event.target;

    const newData = this.state.filteredItems.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [colName]: value };
      }
      return row;
    });

    this.setState({
      filteredItems: newData,
    });
  };

  handleSubmit = async () => {
    const { searchQuery } = this.state;
    const data = {
      'name': searchQuery
    }

    if (validateForm(requiredFields, data)) {
      try {
        await storeData(
          tbl_suppliers,
          data,
          'post'
        )
        this.handleClearSearch()
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.log('Form validation failed.');
    }
  }

  handleUpdate = (item) => {
    this.setState({ 
      // isAddEditSingleItemModalOpen: true,
      itemForUpdate: item
    })
  }

  handleDelete = (id) => {
    this.setState({
      isPromptModalOpen: true,
      idForDeletion: id
    })
  }

  handleYes = () => {
    deleteData(this.state.idForDeletion, tbl_suppliers)
  };

  async fetchData() {
    const strgClassifications = fetchLocalStorage(tbl_suppliers);

    if (!strgClassifications) {
      await fetchDataFromAPI(tbl_suppliers).then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({
      rawData: fetchLocalStorage(tbl_suppliers),
      filteredItems: fetchLocalStorage(tbl_suppliers),
      loading: false
    })
  }

  componentDidUpdate() {
    window.addEventListener('storage', () => {
      this.fetchData()
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  render({ }, { 
    filteredItems, 
    isPromptModalOpen, 
    rawData, 
    currentPage, 
    loading 
  }) {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredItems.slice(startIndex, endIndex);

    if (loading) {
      return <Loader />
    }

    if (rawData && !rawData.length) {
      return null;
    }

    return (
      <div>
        <form class="flex items-center justify-end mb-5 ">
          <div class="mr-3">
            <Search
              data={rawData}
              setSearchResults={this.setSearchResults}
              searchColumns={searchColumns}
              searchPlaceHolder={`Search here`}
            />
          </div>
          <ButtonDefault
            text="Add Supplier"
            handleOnClick={this.openModal}
          />
          {/* {SuppliersModal &&
            <SuppliersModal
              isOpen={showModal}
              onClose={this.closeModal}
              cb={this.closeModal}
              dataForEdit={this.state.dataForEdit}
              isEditing={this.state.isEditing}
            />
          } */}
        </form>
        <div class="overflow-y-auto max-h-[700px] shadow-md">
          {/* <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
            <thead class="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {
                  tableColumns.map((item) => (
                    <th scope="col" class="px-6 py-3">
                      <div class="flex items-center">
                        {item}
                      </div>
                    </th>
                  ))
                }
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {
                filteredItems.map((item, index) => (
                  <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-slate-50 hover:bg-gray-50 cursor-pointer">
                    {Object.keys(item)
                      .filter((colName) => !excludedColumns.includes(colName))
                      .map((colName) => (
                        <td
                          class="px-6 py-3"
                          key={colName}
                          onDblClick={() => this.handleDoubleClick(index, colName)}
                          onKeyDown={this.handleEnterKeyPress}
                        >
                          {this.state.editingCell &&
                            this.state.editingCell.rowIndex === index &&
                            this.state.editingCell.colName === colName ? (
                            <input
                              type="text"
                              value={item[colName]}
                              onChange={this.handleChange}
                              onBlur={() => {
                                this.onCellUpdate()
                                this.handleClearSearch()
                                this.setState({
                                  editingCell: null
                                })
                              }}
                              onKeyDown={this.handleEnterKeyPress}
                              ref={(input) => (this.inputRef = input)}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          ) : (
                            item[colName]
                          )}
                        </td>
                      ))}
                    <td class="text-center">
                      <ButtonDefault
                        text="Edit"
                        handleOnClick={() => {
                          this.openModal()
                          this.setState({
                            dataForEdit: item,
                            isEditing: true
                          })
                        }}
                        className="text-green-600 mr-2"
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
          </table> */}
          <Table 
            data={currentData}
            displayedColumns={displayedColumns}
            onDelete={this.handleDelete}
            onUpdate={this.handleUpdate}
          />
        </div>
        <PromptModal
          isOpen={isPromptModalOpen}
          onClose={() => this.setState({ isPromptModalOpen: false })}
          onYes={this.handleYes}
        />
      </div>
    )
  }
}

export default Suppliers;
