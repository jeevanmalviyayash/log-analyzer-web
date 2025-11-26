
import React, { useRef, useState } from "react";
import axios from "axios";
// import { uploadLogFile } from "../service/uploadService";

const MAX_SIZE = 50 * 1024 * 1024; // 50MB limit, change as required
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
