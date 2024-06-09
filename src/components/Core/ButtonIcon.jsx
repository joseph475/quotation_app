import { h, Component } from 'preact';
import {
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/solid'

const ButtonIcon = ({ type, handleOnClick, style }) => (
  <button type="button" onClick={handleOnClick}
    className={`
      ${style.container}
      py-2 px-3.5`}
  >
    {type === 'delete' && <TrashIcon className={`${style.icon}`} />}
    {type === 'update' && <PencilSquareIcon className={`${style.icon}`} />}
  </button>
);

export default ButtonIcon
