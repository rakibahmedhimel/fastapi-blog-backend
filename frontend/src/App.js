import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 🔥 prevent UI flicker

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://fastapi-blog-backend-2y9w.onrender.com/users/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false); // ✅ always stop loading
      });

  }, []);

  // 🔥 prevent render before check finishes
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <Feed />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}

      {isLoggedIn && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default App;