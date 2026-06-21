import React, { useState } from "react";
import { loginUser } from "../api/auth";

function Login({ setIsLoggedIn, setShowRegister }) { // ✅ FIX: receive prop

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = await loginUser(email, password);

    setLoading(false);

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      setIsLoggedIn(true);
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <form className="auth-box" onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>      

      {/* 🔥 SWITCH TO REGISTER */}
      <p className="switch">
        Don’t have an account?{" "}
        <span onClick={() => setShowRegister(true)}>
          Register
        </span>
      </p>

    </form>
  );
}

export default Login;