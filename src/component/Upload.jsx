import React from "react";

const Upload = () => {
  return (
    <div>
      <h2>Upload Log File</h2>
      <input type="file" accept=".log" />
      <button>Upload</button>
    </div>
  );
};

export default Upload;
