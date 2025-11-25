
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        setSuccess("Password reset successfully! You can now login.");
        setEmail("");
        setNewPassword("");
      } else {
        const msg = await response.text();
        setError(msg || "Failed to reset password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
<div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-black">        <div className="w-1/2 bg-blue-700 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">RESET YOUR PASSWORD</h2>
          <p className="text-sm mb-6">
            Enter your registered email and new password to reset your account credentials.
          </p>
          <p className="text-sm">
            Remembered your password?{" "}
            <Link to="/login" className="text-yellow-300 hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">FORGOT PASSWORD</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{success}</div>
          )}

          <form onSubmit={handleForgotPassword} className="space-y-4">
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
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-1/2 px-4 py-2 border text-blue-600 px-6 py-2 rounded hover:bg-blue-800"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
  );
};

export default ForgotPassword;
