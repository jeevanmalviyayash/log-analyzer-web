import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        setError(msg || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-black">
      <div className="w-1/2 bg-blue-700 text-white p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">WELCOME BACK</h2>
        <p className="text-sm mb-6">
          Log in to access your dashboard and log analysis.
        </p>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-300 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">LOGIN FORM</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-1/2 px-4 py-2 border text-blue-600 px-6 py-2 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Forgot your password?{" "}
          <Link to="/forgotPassword" className="text-blue-600 hover:underline">
            Reset here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;