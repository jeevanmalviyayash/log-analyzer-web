const Filters = ({ level, setLevel, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Level Dropdown */}
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      >
        <option value="">All Levels</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
        <option value="DEBUG">DEBUG</option>
      </select>
 
      {/* Date Filters */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
 
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
    </div>
  );
};
 
export default Filters;
 