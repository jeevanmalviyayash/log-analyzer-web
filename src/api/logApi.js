export const fetchLogs = async (search, level, startDate, endDate) => {
  const url = `http://localhost:8080/api/logs?search=${search}&level=${level}&startDate=${startDate}&endDate=${endDate}`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
 