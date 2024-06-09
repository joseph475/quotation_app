// @ts-nocheck
import { h, Component } from 'preact';
import { ButtonDefault } from '@components';
import {
  storeData,
  validateForm
} from '@helpers';

class AddEditSingleItemModal extends Component {
  constructor() {
    super();
    this.initialData = {
      data: {
        id: null,
        name: ''
      },
    }
    this.state = {
      ...this.initialData
    };
  }

  componentDidMount() {
    const { dataForEdit } = this.props
    if (dataForEdit) {
      this.setState({
        data: dataForEdit
      })
    }
  }

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value
      },
    }));
  };

  render({ isOpen, onClose, onUpdate, onAdd, modalTitle, dataForEdit }) {
    const { data } = this.state
    return (
      <div class={`fixed inset-0 ${isOpen ? 'block' : 'hidden'} z-50`}>
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="absolute inset-0 flex items-center justify-center overflow-auto">
          <div class="bg-white rounded-md shadow-md sm:w-full w-[90%] max-w-xl">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {modalTitle}
              </h3>
              <button type="button" 
                onClick={()=>{
                  this.setState({ ...this.initialData })
                  onClose()
                }}
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <form class="p-4 md:p-5">
              <div class="grid gap-4 mb-4 grid-cols-1">
                <div class="col-span-2">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={this.handleInputChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                </div>
              </div>
              <div className="flex flex-row-reverse">
                <ButtonDefault text="Save"
                  handleOnClick={() => {
                    dataForEdit ? onUpdate(data) : onAdd(data)
                  }} 
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEditSingleItemModal;