import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </button>

          <Feed />
        </>
      )}

    </div>
  );
}

export default App;