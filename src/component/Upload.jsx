import React, { useRef, useState } from "react";
import axios from "axios";
import { uploadLogFile } from "../service/uploadService";

const MAX_SIZE = 50 * 1024 * 1024; // 50MB limit, change as required

const Upload = () => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);

  const resetState = () => {
    setSelectedFile(null);
    setProgress(0);
    setError("");
    setSuccess("");
  };

  const isValidFile = (file) => {
    const validTypes = ["text/plain", "application/octet-stream", ""]; // .log may show as octet-stream or blank
    const validExt = file.name.endsWith(".log") || file.name.endsWith(".txt");
    return validTypes.includes(file.type) && validExt && file.size <= MAX_SIZE;
  };

  const handleFileChange = (e) => {
    resetState();
    const file = e.target.files[0];
    if (file) {
      if (!isValidFile(file)) {
        setError("Please select a valid .log or .txt file (max 5MB)");
        return;
      }
      setSelectedFile(file);
    }
  };

  // this will work whne and drag file over the drop area
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();//Prevents the default action that the browser would take for that event.
    e.stopPropagation();//Stops the event from bubbling (or propagating) up the DOM tree to parent elements.
    resetState();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!isValidFile(file)) {
        setError("Please select a valid .log or .txt file (max 5MB)");
        return;
      }
      setSelectedFile(file);
    }
  };

  //It programmatically triggers a click on the <input type="file" /> 
  // element, which you have referenced using useRef (i.e., fileInputRef).
  //This opens the file picker dialog for the user to select a file.
  const handleBrowseClick = () => fileInputRef.current.click();

  const handleUpload = async () => {
    if (!selectedFile) return;
    setError("");
    setSuccess("");
    setProgress(0);
    setLoading(true); // start loader

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
       await uploadLogFile(selectedFile, (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total));
      });
      setSuccess("Upload successful!");
      setSelectedFile(null);
      //resetState();
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      if (fileInputRef.current) {
    fileInputRef.current.value = ""; // Reset the real input!
  }
    setLoading(false); // stop loader
  }
  };

  return (
  <div className="flex flex-col items-center mt-12">
    <h1 className="text-3xl font-bold text-blue-600">
      Log Analyzer App <span className="text-black">– Upload File</span>
    </h1>
    <div className="mt-10 bg-white rounded-xl shadow p-8 w-96 flex flex-col items-center">
      {/* Loader Spinner */}
      {loading && (
        <div className="mb-4">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      )}

      <form
        className={`flex flex-col items-center border-2 border-dashed rounded-lg w-full py-10 mb-6 transition-colors duration-200 ${
          dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
        } ${loading ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={loading ? undefined : handleBrowseClick}
        style={{ cursor: loading ? "default" : "pointer" }}
      >
        <div className="mb-2">
          <svg fill="#2563eb" width="40" height="40" viewBox="0 0 24 24">
            <path d="M16 16v-6h-3V2H5v8H2l10 10 10-10h-3V8z" />
          </svg>
        </div>
        <span className="text-gray-500 mb-2">Drop your log file here or</span>
        <button
          type="button"
          tabIndex={-1}
          className="text-[#2563eb] border border-[#2563eb] px-4 py-1 rounded font-medium"
          onClick={e => {
            e.stopPropagation();
            if (!loading) handleBrowseClick();
          }}
          disabled={loading}
        >
          BROWSE
        </button>
        <input
          type="file"
          accept=".log,.txt"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          tabIndex={-1}
          disabled={loading}
        />
        {selectedFile && (
          <span className="mt-3 text-xs text-gray-700">{selectedFile.name}</span>
        )}
      </form>

      {/* Error and Success Messaging */}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}

      {/* Progress Bar */}
      {progress > 0 && loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <button
        className={
          `mt-2 w-full py-2 bg-gray-100 rounded font-semibold text-black border border-gray-300 hover:bg-gray-200 `
          + ((!selectedFile || loading) ? "opacity-50 cursor-not-allowed" : "")
        }
        onClick={handleUpload}
        disabled={!selectedFile || loading}
      >
        {loading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </div>
  </div>
);
};

//   return (
//     <div className="flex flex-col items-center mt-12">
//     <h1 className="text-3xl font-bold text-blue-600">
//       Log Analyzer App <span className="text-black">– Upload File</span>
//     </h1>
//     <div className="mt-10 bg-white rounded-xl shadow p-8 w-96 flex flex-col items-center">
//       {/* Loader Spinner */}
//       {loading && (
//         <div className="mb-4">
//           <svg
//             className="animate-spin h-8 w-8 text-blue-600"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8z"
//             ></path>
//           </svg>
//         </div>
//       )}
//         <form
//           className={`flex flex-col items-center border-2 border-dashed rounded-lg w-full py-10 mb-6 transition-colors duration-200 ${
//             dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
//           }`}
//           onDragEnter={handleDrag}
//           onDragOver={handleDrag}
//           onDragLeave={handleDrag}
//           onDrop={handleDrop}
//           onClick={handleBrowseClick}
//           style={{ cursor: "pointer" }}
//         >
//           <div className="mb-2">
//             <svg fill="#2563eb" width="40" height="40" viewBox="0 0 24 24">
//               <path d="M16 16v-6h-3V2H5v8H2l10 10 10-10h-3V8z" />
//             </svg>
//           </div>
//           <span className="text-gray-500 mb-2">Drop your log file here or</span>
//           <button
//             type="button"
//             tabIndex={-1}
//             className="text-[#2563eb] border border-[#2563eb] px-4 py-1 rounded font-medium"
//             onClick={e => {
//               e.stopPropagation();
//               handleBrowseClick();
//             }}
//           >
//             BROWSE
//           </button>
//           <input
//             type="file"
//             accept=".log,.txt"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             tabIndex={-1}
//           />
//           {selectedFile && (
//             <span className="mt-3 text-xs text-gray-700">{selectedFile.name}</span>
//           )}
//         </form>

//         {error && <div className="text-red-600 mb-2">{error}</div>}
//         {success && <div className="text-green-600 mb-2">{success}</div>}

//         {progress > 0 && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         )}

//         <button
//           className={`mt-2 w-full py-2 bg-gray-100 rounded font-semibold text-black border border-gray-300 hover:bg-gray-200 ${!selectedFile ? "opacity-50 cursor-not-allowed" : ""}`}
//           onClick={handleUpload}
//           disabled={!selectedFile}
//         >
//           Upload & Analyze
//         </button>
//       </div>
//     </div>
//   );
// };

export default Upload;
