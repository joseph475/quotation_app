import { h, Component } from 'preact';

const ButtonDefault = ({ text, handleOnClick, className = "" }) => (
  <button type="button" onClick={handleOnClick}
    className={`
      ${className}
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
      dark:focus:ring-blue-800
      !m-0`}
  >
    {text}
  </button>
);

// const ButtonNoBorder = ({ text, handleOnClick, className }) => (
//   // ${color}
//   <button
//     type="button"
//     onClick={handleOnClick}
//     className={`
//       ${className}
//       border
//       hover:border-slate-300
//       font-medium 
//       rounded-lg 
//       text-sm 
//       px-2 
//       py-1 
//       text-center`
//     }
//   >
//     {text}
//   </button>
// );

export default ButtonDefault
