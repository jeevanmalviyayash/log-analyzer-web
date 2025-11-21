import React from "react";
 
const Filters = ({ level, setLevel, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="filters">
 
      {/* Log Level Dropdown */}
      <select value={level} onChange={(e)=>setLevel(e.target.value)}>      
         <option value="">All Levels</option>   
          <option value="INFO">INFO</option>    
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>    
          <option value="DEBUG">DEBUG</option>     
          </select>  
            {/*Start Date */} 
                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>    
                    {/* End Date */}   
                       <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}      
                       />   
                         </div> 
                         );};
                          export default Filters;
 