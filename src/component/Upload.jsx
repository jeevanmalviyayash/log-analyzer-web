
import React from "react";
import "./Upload.css";
import { useNavigate } from "react-router-dom";  
const Upload = () => {

 const navigate = useNavigate();

  const clickAiFix = () => {
    navigate("/ai-assistant");   
  };
  return (

   
    <div>
      <h2>Upload Log File</h2>
      <input type="file" accept=".log" />
      <button>Upload</button>
      <div className="top-bar">
        <button className="ai-btn" onClick={clickAiFix}>
          AI Assistant
        </button>
      </div>
    </div>
   
  );

};

export default Upload;
