import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import "./App.css";
import NoticeBoard from "./pages/NoticeBoard";
import Events from "./pages/Events";
import Memories from "./pages/Memories";
import Notes from "./pages/Notes";



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
          <BrowserRouter>
            <Navbar
              onLogout={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}
            />

            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notices" element={<NoticeBoard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/memories" element={<Memories />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
          </BrowserRouter>
        </>
      )}

    </div>
  );
}

export default App;