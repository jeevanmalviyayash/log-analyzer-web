import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
 
=======
import "../css/home.css";  
>>>>>>> d70cd3b9273bde237620bcc9b4713d6bcf5ce605

function Home() {
  const navigate = useNavigate();
   const clickAiFix = () => {
    navigate("/ai-assistant");   
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#2c3e50",
      padding: "10px 20px",
    },
    logo: {
      color: "#fff",
      fontSize: "20px",
      fontWeight: "bold",
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      gap: "20px",
      margin: 0,
      padding: 0,
    },
    navItem: {
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "color 0.3s",
    },
    navItemHover: {
      color: "#f39c12",
    },
    content: {
      marginTop: "50px",
    },
    heading: {
      fontSize: "28px",
      color: "#34495e",
    },
    paragraph: {
      fontSize: "18px",
      color: "#7f8c8d",
    },
  };

  return (

    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Log Analyzer App</h2>
        <ul style={styles.navLinks}>
          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/upload")}
          >
            Upload
          </li>
          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/log-analyzer")}
          >
            Log Analyzer
          </li>
        </ul>
      </nav>
 
      {/* MAIN CONTENT */}
      <div className="mt-16">
        <h1 className="text-3xl font-bold text-gray-700">Welcome to Log Analyzer</h1>
      </div>
         <button className="ai-btn" onClick={clickAiFix}>
          AI Assistant
        </button>
    </div>
  );
}
 
export default Home;
 