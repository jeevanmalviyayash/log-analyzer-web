import React, { useRef, useState } from "react";
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

  // Reset UI states after interaction
  const resetState = () => {
    setSelectedFile(null);
    setProgress(0);
    setError("");
    setSuccess("");
  };

  // Validate uploaded file type and size
  const isValidFile = (file) => {
    const validTypes = ["text/plain", "application/octet-stream", ""];
    const validExt = file.name.endsWith(".log") || file.name.endsWith(".txt");
    return validTypes.includes(file.type) && validExt && file.size <= MAX_SIZE;
  };

  // Handle file selection via input
  const handleFileChange = (e) => {
    resetState();
    const file = e.target.files[0];
    if (file) {
      if (!isValidFile(file)) {
        setError("Please select a valid .log or .txt file (max 50MB)");
        return;
      }
      setSelectedFile(file);
    }
  };

  // Manage drag-state styling
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  };

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetState();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!isValidFile(file)) {
        setError("Please select a valid .log or .txt file (max 50MB)");
        return;
      }
      setSelectedFile(file);
    }
  };

  // Show system file picker
  const handleBrowseClick = () => fileInputRef.current.click();

  // Handle actual file upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    setError("");
    setSuccess("");
    setProgress(0);
    setLoading(true);

    try {
      await uploadLogFile(selectedFile, (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total));
      });
      setSuccess("Upload successful!");
      setSelectedFile(null);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Add pt-24 if your navbar is fixed,
          or adjust as needed for your navbar height */}
      <div className="w-full flex flex-col items-center justify-center pt-24">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          Log Analyzer App <span className="text-black font-semibold">– Upload File</span>
        </h1>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center mt-8">
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
            className={`flex flex-col items-center border-2 border-dashed rounded-xl w-full py-8 mb-6 transition-colors duration-200 ${
              dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
            } ${loading ? "opacity-50 pointer-events-none" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={loading ? undefined : handleBrowseClick}
            style={{ cursor: loading ? "default" : "pointer" }}
          >
            <div className="mb-3">
              <svg fill="#2563eb" width="48" height="48" viewBox="0 0 24 24">
                <path d="M16 16v-6h-3V2H5v8H2l10 10 10-10h-3V8z" />
              </svg>
            </div>
            <span className="text-gray-500 mb-4 text-center text-sm">
              Drop your log file here or
            </span>
            <button
              type="button"
              tabIndex={-1}
              className="text-blue-600 border border-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
              <span className="mt-4 text-xs text-gray-700 font-mono truncate max-w-full">
                {selectedFile.name}
              </span>
            )}
          </form>

          {/* Error and Success Messages */}
          {error && <div className="text-red-600 mb-3 text-center">{error}</div>}
          {success && <div className="text-green-600 mb-3 text-center">{success}</div>}

          {/* Progress Bar */}
          {progress > 0 && loading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <button
            className={`w-full py-3 rounded-lg font-semibold border border-gray-300
              transition-colors ${
                !selectedFile || loading
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            onClick={handleUpload}
            disabled={!selectedFile || loading}
          >
            {loading ? "Uploading..." : "Upload & Analyze"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
