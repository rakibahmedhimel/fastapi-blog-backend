import React, { useState } from "react";

function Register({ setShowRegister }) {
  // 🔹 State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 Register function
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://fastapi-blog-backend-2y9w.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully!");

        // 🔥 Switch to login page
        setShowRegister(false);

      } else {
        alert(data.detail || "Registration failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <form className="auth-box" onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">
        Register
      </button>

      
    </form>
  );
}

export default Register;