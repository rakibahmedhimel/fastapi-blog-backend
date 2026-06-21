import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../api/user";

function Navbar({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-logo">📚 BatchHub</div>

      <div className="nav-links">
        <Link to="/">Feed</Link>
        <Link to="/profile">Profile</Link>

        <button>Notice Board</button>
        <button>Upcoming Events</button>
        <button>Memories</button>
        <button>Notes</button>
      </div>

      <div className="name">
        👤 {user?.name}
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;