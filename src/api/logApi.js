export const fetchLogs = async (search, startDate, endDate) => {
  const params = new URLSearchParams();
 
  if (search) params.append("search", search);
  if (startDate) params.append("startDate", startDate);  
  if (endDate) params.append("endDate", endDate);        
 
  const token = localStorage.getItem("token");

  const url = `http://localhost:8080/api/logs?${params.toString()}`;
    try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    return [];
  }
};
 