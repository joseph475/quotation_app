import { h, Component } from 'preact';
import {
  ArrowSmallRightIcon
} from '@heroicons/react/24/solid'
// import {
//   fetchDataFromAPI,
//   fetchLocalStorage
// } from '../../../helpers';
import Classifications from '../ConfigPages/Classifications';

class ConfigPages extends Component {

  constructor(props) {
    super(props);

    this.state = {
      forms: {
        'Classifications': false,
        'Products': false,
        'Company': false,
      }
    };
  }

  handleButtonClick = (e) => {
    this.setState({
      forms:{
        'Classifications': false,
        'Products': false,
        'Company': false,
        [e.target.innerText]: true 
      }
    });
  };

  render({ }, { forms }) {
    return (
      <div class="container mx-auto my-4 grid grid-cols-3 gap-8">
        <div class="bg-white rounded-md shadow-md">
          <h2 class="py-4 px-2 text-xl font-bold border-b">Edit Configs</h2>
          <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700 p-4 ">
            <li class="p-3 sm:pb-4 cursor-pointer hover:bg-slate-200 rounded-md">
              <div class="flex items-center space-x-4 rtl:space-x-reverse" data-test="test" onClick={this.handleButtonClick}>
                <div class="flex-1 min-w-0">
                  <p class="text-md font-medium text-gray-600 truncate dark:text-white">
                    Classifications
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <ArrowSmallRightIcon className="h-6 w-6 text-slate-500 cursor-pointer" />
                </div>
              </div>
            </li>
            <li class="p-3 sm:pb-4 cursor-pointer hover:bg-slate-200 rounded-md" onClick={this.handleButtonClick}>
              <div class="flex items-center space-x-4 rtl:space-x-reverse">
                <div class="flex-1 min-w-0">
                  <p class="text-md font-medium text-gray-600 truncate dark:text-white">
                    Products
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <ArrowSmallRightIcon className="h-6 w-6 text-slate-500 cursor-pointer" />
                </div>
              </div>
            </li>
            <li class="p-3 sm:pb-4 cursor-pointer hover:bg-slate-200 rounded-md" onClick={this.handleButtonClick}>
              <div class="flex items-center space-x-4 rtl:space-x-reverse">
                <div class="flex-1 min-w-0">
                  <p class="text-md font-medium text-gray-600 truncate dark:text-white">
                    Company
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <ArrowSmallRightIcon className="h-6 w-6 text-slate-500 cursor-pointer" />
                </div>
              </div>
            </li>
            
          </ul>

        </div>
        <div class="col-span-2">
          {forms.Classifications && <Classifications />}
        </div>
      </div>
    )
  }
}

export default ConfigPages;
