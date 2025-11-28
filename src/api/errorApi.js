import axios from "axios";

const BASE_URL = "http://localhost:8080/api/errors";


export const fetchAllErrors = async (lastDays, token) => {

  const res = await axios.get(BASE_URL, {
    params: lastDays ? { lastDays } : {},
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return res.data;
};

export const fetchDailyCounts = async (lastDays = 10, token) => 
{

  const res = await axios.get(`${BASE_URL}/daily-counts`, {
    params: { lastDays },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return res.data; 
};

export const fetchCategoryStats = async (lastDays = 30, token) => {

  const res = await axios.get(`${BASE_URL}/category-stats`, {
    params: { lastDays },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return res.data; // [{ category: "DATABASE_TRANSACTION_ERROR", count: 3 }, ...]
};
