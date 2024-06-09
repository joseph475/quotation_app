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

  render({ data, displayedColumns, style, onUpdate, onDelete }) {
    return (
      <table class={`${style} min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto`}>
        <thead class="text-xs text-white uppercase bg-[#3a9361]">
          <tr>
            {displayedColumns.map((item) => (
              <th scope="col" class="px-6 py-3 border">
                <div class="flex items-center">
                  {item.value}
                </div>
              </th>
            ))}
            {/* Delete Action*/}
            {(onDelete || onUpdate) && (
              <th scope="col" class="px-6 py-3 border"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-slate-50 hover:bg-gray-50">
                {Object.keys(item)
                  .filter((colName) => displayedColumns.find((i) => i.column === colName))
                  .map((colName) => (
                    <td
                      class="px-6 py-3 border"
                      key={colName}
                    >
                      {item[colName]}
                    </td>
                  ))}
                {(onUpdate || onDelete) && (
                  <td class="text-center py-[5px] border lg:w-[25%] w-auto">
                    {onUpdate && (
                      <ButtonIcon
                        type="update"
                        handleOnClick={()=>{ onUpdate(item) }}
                        style={{
                          container: 'border bg-amber-400 rounded-md',
                          icon:'w-[15px] text-white'
                        }}
                      />
                      )
                    }
                    {onDelete && (
                      <ButtonIcon
                        type="delete"
                        handleOnClick={()=>{ onDelete(item.id) }}
                        style={{
                          container: 'border bg-red-500 rounded-md ml-3',
                          icon:'w-[15px] text-white'
                        }}
                      />
                      )
                    }
                  </td>
                )}
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
