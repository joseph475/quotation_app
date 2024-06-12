// @ts-nocheck
import { h, Component, render } from 'preact';
import ReactPaginate from 'react-paginate';
import {
  ButtonDefault,
  Search,
  PromptModal,
  Loader,
  Table,
  SuppliersModal
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

  closeModal = () => {
    this.setState({
      showModal: false,
      isEditing: false
    });
  };

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


  handleUpdate = (item) => {
    this.setState({ 
      showModal: true,
      itemForUpdate: item, 
      isEditing: true
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
    loading,
    showModal
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
            text="Add Supplier"
            handleOnClick={()=>{ this.setState({showModal: true}) }}
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

        { showModal && 
          <SuppliersModal 
            onClose={this.closeModal}
            dataForEdit={this.state.itemForUpdate}
            isEditing={this.state.isEditing}
            cb={this.closeModal}
          /> 
        }
      </div>
    )
  }
}

export default Suppliers;
