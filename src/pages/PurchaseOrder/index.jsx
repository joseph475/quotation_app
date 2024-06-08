// @ts-nocheck
import { h, Component } from 'preact';
import { Datepicker } from '@components';
// import {
//   storeData,
//   validateForm,
//   fetchLocalStorage,
//   fetchDataFromAPI
// } from '../../../../helpers.js';
// import {
//   requiredFields
// } from './data.js'
// import { tbl_classifications } from '../../../../constants.js';

class PurchaseOrder extends Component {
  constructor() {
    super();

    this.initialData = {
      data: {
        id: null,
        invoiceNo: '',
        dateOrdered: '',
        encodedBy: '',
        supplier_id: '',
      },
    }

    this.state = {
      ...this.initialData,
      // showModal: true,
      // classificationsDropdown: [],
    };
  }

  // async fetchData() {
  //   const strgClassifications = fetchLocalStorage(tbl_classifications);

  //   if (!strgClassifications) {
  //     await fetchDataFromAPI(tbl_classifications).then(() => {
  //       this.setState({ loading: false });
  //     });
  //   }

  //   this.setState({
  //     classificationsDropdown: fetchLocalStorage(tbl_classifications)
  //   })
  // }

  // componentDidUpdate(prevProps) {
  //   const { dataForEdit, isEditing, isOpen } = this.props
  //   if (isOpen !== prevProps.isOpen && isEditing) {
  //     this.setState({
  //       data: dataForEdit
  //     })
  //   }
  // }

  // componentDidMount() {
  //   this.fetchData();
  //   const { dataForEdit, isEditing } = this.props
  //   if (isEditing) {
  //     this.setState({
  //       data: dataForEdit
  //     })
  //   }
  // }

  // handleInputChange = (e) => {
  //   this.setState((prevState) => ({
  //     data: {
  //       ...prevState.data,
  //       [e.target.name]: e.target.value
  //     },
  //   }));
  // };

  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const method = this.props.isEditing ? 'put' : 'post';

  //   if (validateForm(requiredFields, this.state.data)) {
  //     try {
  //       await storeData(
  //         'item',
  //         this.state.data,
  //         method
  //       )
  //       this.setState({ ...this.initialData });
  //       this.props.cb()
  //     } catch (error) {
  //       console.error('Error:', error.message);
  //     }
  //   } else {
  //     console.log('Form validation failed.');
  //   }
  // };
  handleOnDateChange = (event) => {
    console.log(this.state)
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        selectedDate: event.target.value,
      }
    }));
    console.log(this.state)
  };


  handleInputChange = (e) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value
      },
    }));
  };

  render({ }, { data }) {
    // if (!classificationsDropdown) {
    //   return null;
    // }

    return (
      <>
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols- xl:grid-cols-5 ">
            <div class="col-span-full sm:col-span-1">
              <label for="supplier_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier</label>
              <input
                type="text"
                name="supplier_id"
                value={data.supplier_id}
                onChange={this.handleInputChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
            </div>
            <div class="col-span-full sm:col-span-1">
              <DatePicker selectedDate={data.selectedDate} onChange={this.handleOnDateChange} />
            </div>
            <div class="col-span-full sm:col-span-1">
              <label for="encodedBy" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Encoded By:</label>
              <input
                type="text"
                name="encodedBy"
                value={data.encodedBy}
                onChange={this.handleInputChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
            </div>
            <div class="col-span-full sm:col-span-1">
              <label for="invoiceNo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invoice No.</label>
              <input
                type="text"
                name="invoiceNo"
                value={data.invoiceNo}
                onChange={this.handleInputChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
            </div>
          </div>
          {/* <ButtonDefault text="Save" handleOnClick={this.handleSubmit} /> */}
        </form>
      </>
    );
  }
}

export default PurchaseOrder;