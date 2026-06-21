import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>

      {!isLoggedIn ? (
        <>
          {showRegister ? (
            <Register setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} setShowRegister={setShowRegister}/>
          )}

          <p className="switch">
            {showRegister ? "Already have account?" : "New user?"}
            <span onClick={() => setShowRegister(!showRegister)}>
              {showRegister ? " Login" : " Register"}
            </span>
          </p>
        </>
      ) : (
        <>
          <Navbar
              onLogout={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}
            />

          <Feed />
        </>
      )}

    </div>
  );
}

export default App;