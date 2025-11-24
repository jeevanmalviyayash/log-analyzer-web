const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search logs..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 mb-4 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
    />
  );
};
 
export default SearchBar;
 