import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/Authentication/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          userPassword: password,
        }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token);
        setToken(token);
        navigate("/dashboard");
      } else {
        const msg = await response.text();        
  if (response.status === 401) {
        setError("Invalid email or password");
      } else if (response.status === 400) {
        setError("Invalid email or password.");
      } else if (response.status === 500) {
        setError("Invalid email or password.");
      } else {
        setError(msg || "Login failed");
      }
    }
  } catch (err) {
    setError("Something went wrong. Please try again.");
  }
};
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2>Welcome Back</h2>
          <p>Log in to access your dashboard and log analysis.</p>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
        </div>
        <div className="login-right">
          <h2>Login</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>
<p className="forgot-text">
  Forgot your password?{" "}
  <Link to={`/forgotPassword?email=${encodeURIComponent(email)}`} className="forgot-link">
    Reset
  </Link>
</p>
        </div>
      </div>
    </div>
  );
};

export default Login;