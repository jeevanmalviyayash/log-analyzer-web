import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
            style={styles.navItem}
            onMouseOver={(e) => (e.target.style.color = styles.navItemHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navItem.color)}
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            style={styles.navItem}
            onMouseOver={(e) => (e.target.style.color = styles.navItemHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navItem.color)}
            onClick={() => navigate("/upload")}
          >
            Upload
          </li>
          <li
            style={styles.navItem}
            onMouseOver={(e) => (e.target.style.color = styles.navItemHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navItem.color)}
            onClick={() => navigate("/log-analyzer")}
          >
            Log Analyzer
          </li>
        </ul>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to Log Analyzer</h1>
        
      </div>
    </div>
  );
}

export default Home;