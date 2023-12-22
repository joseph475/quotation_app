import { h } from 'preact';
import {
  XMarkIcon
} from '@heroicons/react/24/outline'

const PromptModal = ({ isOpen, onClose, onYes}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          onClick={() => {
            onClose();
          }}
          type="button" 
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
          {/* <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span> */}
          <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-blue-800" />
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
          <button
            type="button"
            onClick={() => {
              onYes();
              onClose();
            }}
            class="text-white 
            bg-red-600 
            hover:bg-red-800 
            focus:ring-4 
            focus:outline-none 
            focus:ring-red-300 
            dark:focus:ring-red-800 
            font-medium 
            rounded-lg 
            text-sm 
            inline-flex 
            items-center 
            px-5 py-2.5 
            text-center 
            me-2">
            Yes, I'm sure
          </button>
          <button 
            type="button"
            onClick={() => {
              onClose();
            }}
            class="text-gray-500 
            bg-white 
            hover:bg-gray-100 
            focus:ring-4 
            focus:outline-none 
            focus:ring-gray-200 
            rounded-lg border 
            border-gray-200 
            text-sm font-medium px-5 py-2.5 
            hover:text-gray-900 focus:z-10">
              No, cancel
            </button>
        </div>
      </div>
      {/* <div class="z-10 bg-white p-8 rounded shadow-md">
        <p class="text-lg font-semibold mb-4">Do you want to proceed?</p>
        <div class="flex justify-between">
          <button
            onClick={() => {
              onYes();
              onClose();
            }}
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={() => {
              onNo();
              onClose();
            }}
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            No
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default PromptModal;
