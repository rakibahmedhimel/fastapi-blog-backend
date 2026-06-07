import React, { useState } from "react";
import { loginUser } from "../api/auth";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await loginUser(email, password);

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      setIsLoggedIn(true);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />

      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;