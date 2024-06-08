import { h } from 'preact';
import {
  ReceiptPercentIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  FolderArrowDownIcon,
  CogIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

const Sidebar = () => {
  return (
    <div>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="absolute top-[5px] left-0 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <a href="/" class="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                <ReceiptPercentIcon className="h-6 w-6 text-slate-400" />
                <span class="ms-3">Invoicing</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-slate-400" />
                <span class="ms-3">Quotation</span>
              </a>
            </li>
            <li>
              <a href="purchase-order" class="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                <ClipboardDocumentListIcon className="h-6 w-6 text-slate-400" />
                <span class="ms-3">Purchased Order</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                <FolderArrowDownIcon className="h-6 w-6 text-slate-400" />
                <span class="ms-3">Purchased Receiving</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                <CurrencyDollarIcon className="h-6 w-6 text-slate-400" />
                <span class="ms-3">Expenses Entry</span>
              </a>
            </li>
            <li>
              <button type="button" class="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 text-white dark:hover:bg-gray-700 hover:text-black" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                <CogIcon className="h-6 w-6 text-slate-400" />
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Settings</span>
                <ChevronDownIcon className="h-6 w-6 text-black-500" />
              </button>
              <ul id="dropdown-example" class="hidden py-2 space-y-2">
                <li>
                  <a href="#" class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white dark:hover:bg-gray-700 hover:text-black">Customers</a>
                </li>
                <li>
                  <a href="#" class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white dark:hover:bg-gray-700 hover:text-black">Company</a>
                </li>
                <li>
                  <a href="/item-maintenance" class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white dark:hover:bg-gray-700 hover:text-black">Item Maintenance</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
