// @ts-nocheck
import { h, Component, render } from 'preact';
import {
  ButtonIcon,
} from '@components';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render({ data, displayedColumns, style, itemEdit, onDelete }) {
    return (
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
        <thead class="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {displayedColumns.map((item) => (
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  {item.value}
                </div>
              </th>
            ))}
            {/* Delete Action*/}
            {onDelete && (
              <th scope="col" class="px-6 py-3"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {
            // @ts-ignore
            data.map((item, index) => (
              <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-slate-50 hover:bg-gray-50 cursor-pointer">
                {Object.keys(item)
                  .filter((colName) => displayedColumns.find((i) => i.column === colName))
                  .map((colName) => (
                    <td
                      class="px-6 py-3"
                      key={colName}
                    >
                      {item[colName]}
                    </td>
                  ))}
                <td class="text-center py-[5px]">
                  {onDelete && (
                    <ButtonIcon
                      type="delete"
                      handleOnClick={()=>{ onDelete(item.id) }}
                      style={{
                        container: 'border bg-red-500 rounded-md',
                        icon:'w-[20px] text-white'
                      }}
                    />
                    )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
