import { h, Component, render } from 'preact';
// import { API_ENDPOINTS } from '../../config/apiConfig';
import {
  fetchDataFromAPI,
  fetchLocalStorage,
  storeData
} from '../../../helpers';
import {
  PencilSquareIcon
} from '@heroicons/react/24/outline'
import Search from '../../components/Search';

class Classifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: [],
      editingCell: null,
      exludedColumns: [
        'id',
        'created_at',
        'updated_at'
      ],
      searchColumns: [
        'name',
      ],
    };

    this.inputRef = null;
  }

  setSearchResults = (results) => {
    this.setState({
      filteredItems: results
    });
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

  onClassficationUpdate = async () =>{
    const { editingCell } = this.state
    const oldData = fetchLocalStorage('classifications');
    const newData = this.getCellValue(this.state.editingCell);

    if (oldData[editingCell.rowIndex][editingCell.colName] !== newData[editingCell.colName]) {
      try {
        await storeData(
          'classification',
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

  handleBlur = () => {
    this.onClassficationUpdate()
  };

  handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onClassficationUpdate()
    }
  };

  getCellValue = (editedCell) => {
    return {
      'id': this.state.filteredItems[editedCell.rowIndex]['id'],
      'name': this.state.filteredItems[editedCell.rowIndex][editedCell.colName],
    }
  };

  async fetchData() {
    const strgClassifications = fetchLocalStorage('classifications');

    if (!strgClassifications) {
      await fetchDataFromAPI('classifications').then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({
      filteredItems: fetchLocalStorage('classifications')
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
        filteredItems: fetchLocalStorage('classifications')
      })
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  render({ }, { filteredItems, exludedColumns, searchColumns }) {
    return (
      <div class="container mx-auto">
        <form class="flex items-center justify-end mb-5">
          <div class="mr-3">
            <Search
              data={fetchLocalStorage('classifications')}
              setSearchResults={this.setSearchResults}
              searchColumns={searchColumns}
              searchPlaceHolder="Add classification here"
            />
          </div>
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
        </form>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto shadow-md">
          <thead class="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Classification Name
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredItems.map((item, index) => (
                <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-slate-50 hover:bg-gray-50 cursor-pointer">
                  {Object.keys(item)
                    .filter((colName) => !exludedColumns.includes(colName))
                    .map((colName) => (
                      <td
                        class="px-6 py-2"
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
                            onBlur={this.handleBlur}
                            ref={(input) => (this.inputRef = input)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        ) : (
                          item[colName]
                        )}
                      </td>
                    ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Classifications;
