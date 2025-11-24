import { useNavigate } from "react-router-dom";
 
function Home() {
  const navigate = useNavigate();
 
  return (
    <div className="font-sans text-center">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center bg-gray-800 px-6 py-4 shadow">
        <h2 className="text-white text-xl font-bold">Log Analyzer App</h2>
 
        <ul className="flex gap-6 text-white font-semibold">
          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/upload")}
          >
            Upload
          </li>
          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/log-analyzer")}
          >
            Log Analyzer
          </li>
        </ul>
      </nav>
 
      {/* MAIN CONTENT */}
      <div className="mt-16">
        <h1 className="text-3xl font-bold text-gray-700">Welcome to Log Analyzer</h1>
      </div>
    </div>
  );
}
 
export default Home;
 