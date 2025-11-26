// src/service/uploadService.js
import axios from "axios";

const BASE_URL_FOR_UPLOAD = "http://localhost:8080/api/errors/upload";

export const uploadLogFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(BASE_URL_FOR_UPLOAD, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
};
