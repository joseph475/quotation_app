import { h, Component } from 'preact';

const ButtonDefault = ({ text, handleOnClick, addClass = "" }) => (
  <button type="button" onClick={handleOnClick}
    class={`
      ${addClass}
      text-white 
      bg-blue-700 
      hover:bg-blue-800 
      focus:ring-4 
      focus:ring-blue-300 
      font-medium rounded-lg 
      text-sm 
      px-5 py-2.5 
      dark:bg-blue-600 
      dark:hover:bg-blue-700 
      focus:outline-none 
      dark:focus:ring-blue-800`}
  >
    {text}
  </button>

);

const ButtonNoBorder = ({ text, handleOnClick, color, addClass = "" }) => (
  // ${color}
  <button
    type="button"
    onClick={handleOnClick}
    class={`
      ${addClass}
      text-${color}-500
      border
      hover:border-slate-300
      font-medium 
      rounded-lg 
      text-sm 
      px-2 
      py-1 
      text-center`
    }
  >
    {text}
  </button>

);

export {
  ButtonDefault,
  ButtonNoBorder
}
