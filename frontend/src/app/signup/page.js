// Signup page for Mini Project Manager
"// Removed duplicate 'use client' directive";
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (token) router.push("/projects");
  }, [token, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-80"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-600">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}
