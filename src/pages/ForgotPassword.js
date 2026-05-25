import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert("Password reset link sent (demo only)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
