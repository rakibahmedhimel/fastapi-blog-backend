import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    // 🔥 Verify token with backend
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
      });
  }, []);

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