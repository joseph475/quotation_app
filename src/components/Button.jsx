import { h, Component } from 'preact';

const ButtonDefault = ({ text, handleOnClick }) => (
  <button type="button" onClick={handleOnClick} 
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    {text}
  </button>

);

const ButtonNoBorder = ({ text, handleOnClick, color }) => (
  <button 
    type="button" 
    onClick={handleOnClick} 
    class={`text-${color}-700 hover:text-white hover:bg-${color}-800  font-medium rounded-lg text-sm px-2 py-1 text-center `}
  >
    {text}
  </button>

);

export {
  ButtonDefault,
  ButtonNoBorder
}
