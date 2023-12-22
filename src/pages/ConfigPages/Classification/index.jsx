import { h, Component, render } from 'preact';
import Search from '../../../components/Search';
import PromptModal from '../../../components/Modals/PromptModal';
import {
  ButtonDefault,
  ButtonNoBorder
} from '../../../components/Button.jsx';
import {
  tbl_classifications,
  excludedColumns,
  requiredFields,
  searchColumns
} from './data'
import {
  fetchDataFromAPI,
  fetchLocalStorage,
  storeData,
  validateForm,
  deleteData
} from '../../../../helpers';

class Classifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: [],
      editingCell: null,
      searchQuery: '',
      isPromptModalOpen: false,
      idForDeletion: null
    };

    this.inputRef = null;
    this.searchComponentRef = null;
  }

  setSearchResults = (results, searchQuery) => {
    this.setState({
      filteredItems: results,
      searchQuery
    });
  };

  handleClearSearch = () => {
    if (this.searchComponentRef) {
      this.searchComponentRef.clearSearch();
    }
  };

  handleDoubleClick = (rowIndex, colName) => {
    this.setState({
      editingCell: { rowIndex, colName },
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

  onCellUpdate = async () => {
    const { editingCell } = this.state
    const oldData = fetchLocalStorage(tbl_classifications);
    const newData = this.getCellValue(this.state.editingCell);

    if (oldData[editingCell.rowIndex][editingCell.colName] !== newData[editingCell.colName]) {
      try {
        await storeData(
          tbl_classifications,
          newData,
          'put'
        )
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    this.setState({
      editingCell: null
    });
  }

  handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onCellUpdate()
      this.handleClearSearch()
    }
  };

  handleSubmit = async () => {
    const { searchQuery } = this.state;
    const data = {
      'name': searchQuery
    }

    if (validateForm(requiredFields, data)) {
      try {
        await storeData(
          tbl_classifications,
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

  handleDelete = (id) => {
    this.setState({ 
      isPromptModalOpen: true,
      idForDeletion: id
    })
  }

  handleYes = () => {
    deleteData(this.state.idForDeletion, tbl_classifications)
  };

  getCellValue = (editedCell) => {
    return {
      'id': this.state.filteredItems[editedCell.rowIndex]['id'],
      [editedCell.colName]: this.state.filteredItems[editedCell.rowIndex][editedCell.colName],
    }
  };

  async fetchData() {
    const strgClassifications = fetchLocalStorage(tbl_classifications);

    if (!strgClassifications) {
      await fetchDataFromAPI(tbl_classifications).then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({
      filteredItems: fetchLocalStorage(tbl_classifications)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.editingCell &&
      this.state.editingCell !== prevState.editingCell &&
      this.inputRef
    ) {
      this.inputRef.focus();
    }

    window.addEventListener('storage', () => {
      this.setState({
        filteredItems: fetchLocalStorage(tbl_classifications)
      })
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  render({ }, { filteredItems, isPromptModalOpen }) {
    return (
      <div class="container mx-auto">
        <form class="flex items-center justify-end mb-5 ">
          <div class="mr-3">
            <Search
              data={fetchLocalStorage(tbl_classifications)}
              setSearchResults={this.setSearchResults}
              searchColumns={searchColumns}
              searchPlaceHolder={`Add ${tbl_classifications} here`}
              ref={(ref) => (this.searchComponentRef = ref)}
            />
          </div>
          <ButtonDefault
            text="Save"
            handleOnClick={this.handleSubmit}
          />
        </form>
        <div class="overflow-y-auto max-h-[700px] shadow-md">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
            <thead class="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Classification Name
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  {/* Delete */}
                </th>
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

export default Classifications;
