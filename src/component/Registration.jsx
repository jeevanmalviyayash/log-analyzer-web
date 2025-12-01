import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Registration.css";
import Modal from "./Modal";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const validateName = (value) => (!value.trim() ? "Name is required" : "");
  const validateEmail = (value) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email address" : "";
  const validatePhone = (value) =>
    !/^[0-9]{10}$/.test(value) ? "Phone number must be 10 digits" : "";
  const validatePassword = (passwordValue) => {
  if (!PASSWORD_REGEX.test(passwordValue)) {
    return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
  }
  return "";
};
  const validateConfirmPassword = (value) =>
    value !== password ? "Passwords do not match" : "";
  const validateRole = (value) => (!value ? "Please select your role" : "");
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(value)
    }));
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
    setErrors((prev) => ({ ...prev, role: validateRole(value) }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
      role: validateRole(role)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    try {
      const response = await fetch("http://localhost:8080/api/Authentication/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: name,
          userEmail: email,
          userPhoneNumber: phone,
          userPassword: password,
          userRole: role
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const msg = await response.text();
        alert(msg || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <h2>Log Analyzer</h2>
          <p>
            Our Log Analyzer helps you parse, visualize, and monitor logs in real-time to detect issues, optimize performance, and ensure system reliability.
          </p>
          <select
            value={role}
            onChange={handleRoleChange}
            className="role-select"
            required
          >
            <option value="">-- Select Role --</option>
            <option value="REVIEWER">Reviewer</option>
            <option value="DEVELOPER">Developer</option>
          </select>
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>
        <div className="register-right">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="User Name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <div className="password-group">
              <div className="input-with-icon">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {password && PASSWORD_REGEX.test(password) && (
                  <span className="icon success">✅</span>
                )}
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>
              <div className="input-with-icon">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {confirmPassword && password !== confirmPassword && (
                  <span className="icon error">⚠️</span>
                )}
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <button type="submit">Register</button>
          </form>
          <p className="login-text">
            Already registered?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
      {isSuccess && (
        <Modal
          message="Congratulations, your account has been successfully created."
          onContinue={() => navigate("/login")}
        />
      )}
    </div>
  );
};

export default Register;