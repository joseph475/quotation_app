import { h, Component } from 'preact';
import {
  TrashIcon
} from '@heroicons/react/24/solid'

const ButtonIcon = ({ type, handleOnClick, style }) => (
  <button type="button" onClick={handleOnClick}
    className={`
      ${style.container}
      py-2 px-3`}
  >
    {type === 'delete' && <TrashIcon className={`${style.icon}`} />}
  </button>
);

export default ButtonIcon
