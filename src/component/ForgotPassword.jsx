import React, { useState, useEffect } from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom";
import "../css/ForgotPassword.css";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const prefilledEmail = params.get("email") || "";
  const [email, setEmail] = useState(prefilledEmail);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (prefilledEmail) {
      setEmail(prefilledEmail);
    }
  }, [prefilledEmail]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/Authentication/forgotPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          userPassword: newPassword,
        }),
      });

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");        
          setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const msg = await response.text();
        setError(msg || "Failed to reset password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <div className="forgot-left">
          <h2>Reset Your Password</h2>
          <p>Enter your registered email and new password to reset your account credentials.</p>
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </div>

        <div className="forgot-right">
          <h2>Forgot Password</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
