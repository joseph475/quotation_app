// @ts-nocheck
import { h, Component, render } from 'preact';
import {
  ButtonDefault,
  AddEditSingleItemModal,
  Search,
  PromptModal,
  Table
} from '@components';
import {
  fetchDataFromAPI,
  fetchLocalStorage,
  storeData,
  validateForm,
  deleteData,
  tbl_classifications
} from '@helpers';
import {
  requiredFields,
  searchColumns,
  displayedColumns
} from './data'

class Classifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: [],
      searchQuery: '',
      isPromptModalOpen: false,
      isAddEditSingleItemModalOpen: false,
      idForDeletion: null,
      itemForUpdate: null,
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

  handleUpdate = (item) => {
    this.setState({ 
      isAddEditSingleItemModalOpen: true,
      itemForUpdate: item
    })
  }

  handleYes = () => {
    deleteData(this.state.idForDeletion, tbl_classifications)
  };

  onUpdate = async (newData) => {
    try {
      await storeData(
        tbl_classifications,
        newData,
        'put'
      )
    } catch (error) {
      console.error('Error:', error.message);
    }
    this.setState({ 
      isAddEditSingleItemModalOpen: false,
      itemForUpdate: null
    })
  }

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

  componentDidUpdate() {
    window.addEventListener('storage', () => {
      this.setState({
        filteredItems: fetchLocalStorage(tbl_classifications)
      })
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  render({ }, { filteredItems, isPromptModalOpen, isAddEditSingleItemModalOpen, itemForUpdate }) {
    return (
      <div>
        <form class="flex items-center justify-end mb-5">
          <div class="mr-3 flex-grow md:flex-grow-0">
            <Search
              data={fetchLocalStorage(tbl_classifications)}
              setSearchResults={this.setSearchResults}
              searchColumns={searchColumns}
              searchPlaceHolder={`Search here`}
              ref={(ref) => (this.searchComponentRef = ref)}
            />
          </div>
          <ButtonDefault
            text="Save"
            handleOnClick={this.handleSubmit}
          />
        </form>
        <div class="overflow-y-auto max-h-[700px] shadow-md">
          <Table 
            data={filteredItems}
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
        {isAddEditSingleItemModalOpen && 
         <AddEditSingleItemModal
            isOpen={isAddEditSingleItemModalOpen}
            onClose={() => {
              this.setState({ 
                isAddEditSingleItemModalOpen: false,
                itemForUpdate: null
              })
            }}
            dataForEdit={itemForUpdate}
            onUpdate={this.onUpdate}
            modalTitle="Update Supplier"
         />
        }
      </div>
    )
  }
}

export default Classifications;
