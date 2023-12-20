import { h } from 'preact';
import {
  UserCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid'
import Tooltip from './Tooltip';

const Header = () => (
  <header class="bg-white p-4 border-b border-gray-200 sm:ml-64">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-bold">Logo</div>
      <div class="flex">
        <Tooltip content="Configs" position="right">
          <a href="/configs">
            <Cog6ToothIcon className="h-8 w-8 text-slate-500 cursor-pointer mr-2" />
          </a>
        </Tooltip>
        <Tooltip content="Logout" position="right">
          <UserCircleIcon className="h-8 w-8 text-blue-700 cursor-pointer" />
        </Tooltip>
      </div>
    </div>
  </header>
);

export default Header;