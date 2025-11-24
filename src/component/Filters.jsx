const Filters = ({ level, setLevel, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="p-2 border border-gray-400 rounded-md"
      >
        <option value="">All Levels</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
        <option value="DEBUG">DEBUG</option>
      </select>
 
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-2 border border-gray-400 rounded-md"
      />
 
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-2 border border-gray-400 rounded-md"
      />
    </div>
  );
};
 
export default Filters;
 