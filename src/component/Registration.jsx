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

    if (!name) {
    setError("Name is required");
    return;
  }
    if (!/^[0-9]{10}$/.test(phone)) {
  setError("Phone number must be 10 digits");
    return;
  }
    if (!role) {
    setError("Please select your role");
    return;
  }
    if (!email.includes("@")) {
    setError("Invalid email address");
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
const response = await fetch("http://localhost:8080/api/Authentication/registerUser", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    userName: name,
    userEmail: email,
    userPhoneNumber: phone,
    userPassword: password,
    userRole: role,
  }),
});

      if (response.ok) {
        navigate("/login");
      } else {
        const msg = await response.text();
        setError(msg || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-black">
        <div className="w-1/2 bg-blue-700 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Log Analyzer</h2>
          <p className="text-sm mb-6">
Our Log Analyzer helps you parse, visualize, and monitor logs in real-time to detect issues, optimize performance, and ensure system reliability.          </p>      
            <select
              value={role}
            onChange={(e) => {setRole(e.target.value);
                if (e.target.value) {
                    setError(""); 
                }
        }}
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-gray-100"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="REVIEWER">Reviewer</option>
              <option value="DEVELOPER">Developer</option>
            </select>

        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">REGISTER FORM</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e)=> setPhone(e.target.value) }
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              pattern="[0-9]{10}"
              title="Phone number must be 10 digits"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />     
<div className="flex gap-4">
  <div className="relative w-1/2">
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className={`w-full px-4 py-2 border rounded focus:ring-2 ${
        password ? "border-green-500" : "border-gray-300"
      }`}
      required
    />
    {password && (
      <span className="absolute right-3 top-3 text-green-500">
        ✅
      </span>
    )}
  </div>
  <div className="relative w-1/2">
    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className={`w-full px-4 py-2 border rounded focus:ring-2 ${
        confirmPassword && confirmPassword !== password
          ? "border-yellow-500"
          : "border-gray-300"
      }`}
      required
    />
    {confirmPassword && confirmPassword !== password && (
      <>
        <span className="absolute right-3 top-3 text-yellow-500">⚠️</span>
      </>
    )}
  </div>
</div>
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-yellow-600 text-sm">Wrong Password</p>
            )}
            <button
              type="submit"
              className="w-1/2 px-4 py-2 border text-blue-600 px-6 py-2 rounded hover:bg-blue-800"
            >
              Register
            </button>
        </form>

          <p className="mt-4 text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Register;