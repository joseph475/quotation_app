// @ts-nocheck
import { h, Component, render } from 'preact';
import ReactPaginate from 'react-paginate';
import {
  ButtonDefault,
  AddEditSingleItemModal,
  Search,
  PromptModal,
  Table,
  Loader
} from '@components';
import {
  fetchDataFromAPI,
  fetchLocalStorage,
  storeData,
  validateForm,
  deleteData,
  tbl_models
} from '@helpers';
import {
  requiredFields,
  searchColumns,
  displayedColumns,
  itemsPerPage
} from './data'

class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: [],
      filteredItems: [],
      currentPage: 0,
      loading: true,
      isPromptModalOpen: false,
      isAddEditSingleItemModalOpen: false,
      idForDeletion: null,
      itemForUpdate: null,
    };
  }

  setSearchResults = (results) => {
    this.setState({
      filteredItems: results,
      currentPage: 0
    });
  };

  handleSubmit = async (data) => {
    if (validateForm(requiredFields, data)) {
      try {
        await storeData(
          tbl_models,
          data,
          'post'
        )
        this.setState({ 
          isAddEditSingleItemModalOpen: false,
          itemForUpdate: null
        })
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
    deleteData(this.state.idForDeletion, tbl_models)
    this.fetchData()
  };

  onUpdate = async (newData) => {
    try {
      await storeData(
        tbl_models,
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
    const strgModels = fetchLocalStorage(tbl_models);

    if (!strgModels) {
      await fetchDataFromAPI(tbl_models).then(() => {
        this.setState({
          loading: false 
        });
      });
    }
    this.setState({
      rawData: fetchLocalStorage(tbl_models),
      filteredItems: fetchLocalStorage(tbl_models),
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
      isAddEditSingleItemModalOpen, 
      itemForUpdate, 
      currentPage,
      loading,
      rawData
    }) {

    if (loading) {
      return <Loader />
    }

    if (rawData && !rawData.length) {
      return null;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredItems.slice(startIndex, endIndex);

    return (
      <div>
        <form class="flex items-center justify-between mb-5">
          <div class="mr-3 flex-grow md:flex-grow-0">
            <Search
              data={rawData}
              setSearchResults={this.setSearchResults}
              searchColumns={searchColumns}
              searchPlaceHolder={`Search here`}
            />
          </div>
          <ButtonDefault
            text="Add"
            handleOnClick={() => {
              this.setState({ 
                isAddEditSingleItemModalOpen: true
              })
            }}
          />
        </form>
        <div class="overflow-y-auto max-h-[700px] shadow-md">
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
        
        <ReactPaginate
          pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={(selectedPage) => { 
            this.setState({ currentPage: selectedPage.selected })
          }}
          previousLabel="<"
          nextLabel=">"
          containerClassName="pagination"
          activeClassName="active"
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
            onAdd={this.handleSubmit}
            modalTitle={itemForUpdate ? 'Update Model' : 'Add New Model'}
         />
        }
      </div>
    )
  }
}

export default Models;
