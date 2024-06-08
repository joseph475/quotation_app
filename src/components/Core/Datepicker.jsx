const DatePicker = ({ onChange, selectedDate }) => (
  <div>
    <label htmlFor="datePicker" className="block text-gray-700 text-sm mb-2">
      Date
    </label>
    <input
      type="date"
      id="datePicker"
      value={selectedDate}
      onChange={onChange}
      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 cursor-pointer"
    />
  </div>
);


export default DatePicker