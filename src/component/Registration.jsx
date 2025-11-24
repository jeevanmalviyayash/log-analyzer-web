import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const Register = () => {
  const navigate = useNavigate();
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
 
const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
 
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }
 
  try {
    const response = await fetch("http://localhost:8080/api/Authentication/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
        userEmail: email,
        userPhoneNumber: phone,
        userPassword: password,
        userRole: role,
      }),
    });
 
    if (response.ok) {
      // Registration successful
      navigate("/login");
    } else {
      const msg = await response.text(); // Get error message from server
      setError(msg || "Registration failed");
    }
  } catch (err) {
    setError("Something went wrong. Please try again.");
    console.error(err); // Log error for debugging
  }
};
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-500 p-4">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg p-8">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-indigo-500">Log Analyzer</h1>
          <p className="text-lg font-semibold text-indigo-600 mt-2 tracking-wide">
  Register New User
</p>
 
        </div>
 
        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-semibold">
            {error}
          </div>
        )}
 
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            title="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => {
              if (confirmPassword && confirmPassword !== password) {
                setError("Passwords do not match");
              } else {
                setError("");
              }
            }}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
 
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          >
            <option value="">-- Select Role --</option>
            <option value="REVIEWER">Reviewer</option>
            <option value="DEVELOPER">Developer</option>
          </select>
 
       
<button
  type="submit"
  className="w-full bg-blue-600 text-black py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition duration-300 shadow-md"
>
  Register
</button>
 
 
        </form>
 
        <p className="mt-6 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
 
 
export default Register;