// @ts-nocheck
import { h, Component } from 'preact';
import { API_ENDPOINTS } from '../../config/apiConfig';
import {
  storeData,
  validateForm,
  fetchLocalStorage,
  fetchDataFromAPI
} from '../../../helpers';
// import axios from 'axios';
import {
  PlusCircleIcon
} from '@heroicons/react/24/outline'

class ItemsModal extends Component {
  constructor() {
    super();

    this.initialData = {
      data: {
        itemCode: '',
        itemName: '',
        description: '',
        classification: '',
        cost: null,
        retailCost: null,
        techPrice: null,
        product: '',
        stock: null,
      },
    }

    this.state = {
      ...this.initialData,
      showModal: true,
      classificationsDropdown: [],
      requiredFields: [
        'itemCode',
        'itemName',
        'description',
        'classification',
        'product',
      ]
    };
  }

  componentDidMount() {
    const strgClassifications = fetchLocalStorage('classifications');

    if (!strgClassifications) {
      fetchDataFromAPI('classifications').then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({
      classificationsDropdown: fetchLocalStorage('classifications')
    })

  }

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(this.state.requiredFields, this.state.data)) {
      try {
        await storeData(
          API_ENDPOINTS.storeItems,
          API_ENDPOINTS.getItems,
          this.state.data,
          'Items'
        )
        this.setState({ ...this.initialData });
        this.props.cb()
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.log('Form validation failed.');
    }
  };

  render({ isOpen, onClose }) {
    const { data, classificationsDropdown } = this.state
    if (classificationsDropdown && !classificationsDropdown.length) {
      return null;
    }

    return (
      <>
        {this.state.showModal && (
          <div class={`fixed inset-0 ${isOpen ? 'block' : 'hidden'}`}>
            <div class="absolute inset-0 bg-black opacity-50"></div>
            <div class="absolute inset-0 flex items-center justify-center overflow-auto">
              <div class="bg-white rounded-md shadow-md w-full max-w-xl">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Add New Item
                  </h3>
                  {/* <button onclick={this.testSubmit} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">asd</button> */}
                  <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
                <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-4">
                    <div class="col-span-2">
                      <label for="itemCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Code</label>
                      <input type="text" name="itemCode" value={data.itemCode} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                    </div>
                    <div class="col-span-2">
                      <label for="itemName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                      <input type="text" name="itemName" value={data.itemName} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                    </div>
                    <div class="col-span-2">
                      <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Description</label>
                      <textarea name="description" rows="4" value={data.description} onChange={this.handleInputChange} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write item description here"></textarea>
                    </div>
                    <div class="col-span-2">
                      <label for="classification" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Classification</label>
                      <select name="classification" value={data.classification} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="">
                        <option value="" disabled>Select Classification</option>
                        {
                          classificationsDropdown.map((item) => (
                            <option value={item.classId}>{item.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div class="grid gap-4 mb-4 grid-cols-3">
                    <div class="col-span-2 sm:col-span-1">
                      <label for="product" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
                      <select name="product" value={data.product} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="" disabled>Select category</option>
                        <option value="item">Item</option>
                        <option value="services">Services</option>
                      </select>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                      <input type="number" name="stock" value={data.stock} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                    </div>
                    {/* <div class="col-span-2 sm:col-span-1">
                      <label for="batchNo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">BatchNo</label>
                      <input type="number" name="batchNo" value={data.batchNo} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                    </div> */}
                    <div class="col-span-2 sm:col-span-1">
                      <label for="cost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cost</label>
                      <input type="number" name="cost" value={data.cost} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="retailCost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Retail Cost</label>
                      <input type="number" name="retailCost" value={data.retailCost} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="techPrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tech Price</label>
                      <input type="number" name="techPrice" value={data.techPrice} onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                    </div>
                  </div>
                  <button type="submit" onClick={this.handleSubmit} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <PlusCircleIcon className="h-8 w-8 pr-2 text-white-500" />
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ItemsModal;