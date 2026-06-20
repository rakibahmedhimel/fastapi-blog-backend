import React, { useState } from "react";
import { loginUser } from "../api/auth";

function Login({ setIsLoggedIn, setShowRegister }) { // ✅ FIX: receive prop

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await loginUser(email, password);

    console.log("LOGIN RESPONSE:", data); // 🔥 DEBUG

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      setIsLoggedIn(true);
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="auth-box">
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

      <button onClick={handleLogin}>
        Login
      </button>

      {/* 🔥 SWITCH TO REGISTER */}
      <p className="switch">
        Don’t have an account?{" "}
        <span onClick={() => setShowRegister(true)}>
          Register
        </span>
      </p>

    </div>
  );
}

export default Login;