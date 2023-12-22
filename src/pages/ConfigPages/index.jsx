import { h, Component } from 'preact';
import {
  ArrowSmallRightIcon
} from '@heroicons/react/24/solid'
// import {
//   fetchDataFromAPI,
//   fetchLocalStorage
// } from '../../../helpers';
import Classifications from './Classification/index.jsx';

class ConfigPages extends Component {

  constructor(props) {
    super(props);

    this.initialData = {
      forms: {
        'Classifications': true,
        'Company': false,
      }
    }

    this.state = {
      ...this.initialData,
      configTabs: [
        'Classifications',
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
      <div class="container mx-auto my-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="bg-white rounded-md shadow-md h-fit">
          <h2 class="py-4 px-2 text-xl font-bold border-b">Edit Configs</h2>
          <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700 p-4 ">
            {configTabs.map((item) => (
              <li
                class={`p-3 sm:pb-4 cursor-pointer hover:bg-slate-200 rounded-md 
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
        <div class="lg:col-span-2 col-span-3">
          {forms.Classifications && <Classifications />}
        </div>
      </div>
    )
  }
}

export default ConfigPages;
