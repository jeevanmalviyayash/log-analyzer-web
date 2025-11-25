
import React from "react";
import "./Upload.css";
import { useNavigate } from "react-router-dom";  
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
