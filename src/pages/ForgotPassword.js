import React, { useState } from "react";
import AuthLayout from "./AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert("Reset link sent (UI only)");
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-indigo-600 text-white p-3 rounded-lg"
        >
          Send Reset Link
        </button>
      </div>
    </AuthLayout>
  );
}