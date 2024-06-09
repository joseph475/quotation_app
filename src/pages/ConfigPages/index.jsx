import { h, Component } from 'preact';
import {
  ArrowSmallRightIcon
} from '@heroicons/react/24/solid'
// import {
//   fetchDataFromAPI,
//   fetchLocalStorage
// } from '../../../helpers';
import Classifications from './Classification/index.jsx';
import Suppliers from './Suppliers/index.jsx';

class ConfigPages extends Component {

  constructor(props) {
    super(props);

    this.initialData = {
      forms: {
        'Classifications': true,
        'Suppliers': false,
        'Company': false,
      }
    }

    this.state = {
      ...this.initialData,
      configTabs: [
        'Classifications',
        'Suppliers',
        'Company'
      ]
    };
  }

  handleButtonClick = (e) => {
    this.setState({
      forms: {
        ...this.initialData,
        [e.target.innerText]: true
      }
    });
  };

  render({ }, { forms, configTabs }) {
    return (
      <div class="mx-auto my-4 grid grid-cols-1 xl:grid-cols-4 xl:gap-4 gap-0">
        <div class="bg-white rounded-md shadow-md h-fit col-span-4 lg:col-span-1 mb-5">
          <h3 class="py-4 px-3 text-lg font-bold border-b bg-[#3a9361] text-white">Settings</h3>
          <ul class="divide-y divide-gray-200 dark:divide-gray-700 py-2">
            {configTabs.map((item) => (
              <li
                class={`px-3 py-2 cursor-pointer hover:bg-slate-200
                ${forms[item] === true ? 'bg-slate-200 ' : ''}`}
                onClick={this.handleButtonClick}>
                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                  <div class="flex-1 min-w-0">
                    <p class="text-md font-mediumtruncate dark:text-white">
                      {item}
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowSmallRightIcon className="h-6 w-6  cursor-pointer" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div class="col-span-4 lg:col-span-3">
          {forms.Classifications && <Classifications />}
          {forms.Suppliers && <Suppliers />}
        </div>
      </div>
    )
  }
}

export default ConfigPages;
