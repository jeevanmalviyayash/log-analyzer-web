const Filters = ({ setLevel, startDate, setStartDate, endDate, setEndDate }) => {
  const handleDateChange = (setter) => (e) => {
    setter(e.target.value);
  };
 
  return (
    <div className="flex flex-wrap gap-6 mb-6">
 
      {/* Start Date */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={handleDateChange(setStartDate)}
          className="p-2 border border-gray-300 rounded-lg shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>
 
      {/* End Date */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={handleDateChange(setEndDate)}
          className="p-2 border border-gray-300 rounded-lg shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>
 
    </div>
  );
};
 
export default Filters;
 