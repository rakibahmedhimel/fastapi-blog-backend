import React, { useEffect, useState } from "react";
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
        <button>Feed</button>
        <button>Notice Board</button>
        <button>Upcoming Events</button>
        <button>Memories</button>
        <button>Notes</button>
        <button>Profile</button>
      </div>

      <div>
        👤 {user?.name}
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;