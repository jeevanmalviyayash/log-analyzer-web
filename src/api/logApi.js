export const fetchLogs = async (search, startDate, endDate) => {
  const params = new URLSearchParams();
 
  if (search) params.append("search", search);
  if (startDate) params.append("startDate", startDate);  
  if (endDate) params.append("endDate", endDate);        
 
  const url = `http://localhost:8080/api/logs?${params.toString()}`;
 
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
 