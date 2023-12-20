import { h, Component } from 'preact';
import {
  fetchDataFromAPI,
  fetchLocalStorage
} from '../../../helpers';
import {
  ArrowsUpDownIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'

class Classifications extends Component {

  constructor(props) {
    super(props);

    this.state = {
      classifications: []
    };
  }

  async fetchData() {
    const strgClassifications = fetchLocalStorage('classifications');

    if (!strgClassifications) {
      console.log('asd');
      await fetchDataFromAPI('classifications').then(() => {
        this.setState({ loading: false });
      });
    }

    this.setState({
      classifications: fetchLocalStorage('classifications')
    })
  }


  componentDidMount() {
    this.fetchData();
  }

  render({ }, { classifications }) {
    return (
      <div class="container mx-auto">
        <form class="flex items-center justify-end mb-5">
          <div class="mr-3">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add classifications here"
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
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              classifications.map((i, index) => (
                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-slate-50 hover:bg-gray-50">
                  <td class="px-6 py-4">
                    {i.name}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a href="#">
                      <PencilSquareIcon className="h-6 w-6 text-blue-500 hover:text-blue-800 float-right" />
                    </a>
                  </td>
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
