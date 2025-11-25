const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="w-full mb-5">
      <input
        type="text"
        placeholder="🔍 Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
};
 
export default SearchBar;
 