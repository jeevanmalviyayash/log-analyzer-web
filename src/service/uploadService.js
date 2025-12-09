// src/service/uploadService.js
import axios from "axios";

const BASE_URL_FOR_UPLOAD = "http://localhost:8080/api/errors/upload?file";

export const uploadLogFile = (file, token, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post("http://localhost:8080/api/errors/upload?file", formData, {
    headers: {Authorization: `Bearer ${token}`},
    onUploadProgress,
  });
};
export const addManualError = (logDTO, token) => {
  return axios.post("http://localhost:8080/api/errors/saveManualError", logDTO, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};