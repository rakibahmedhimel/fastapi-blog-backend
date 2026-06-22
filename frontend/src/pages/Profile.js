import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;
  console.log(user);
  
  return (
    <div className="profile-card">
      <h2>👤 Profile</h2>
      <img
        src={
          user.avatar_url ||
          "https://i.pravatar.cc/150"
        }
        alt="avatar"
        className="profile-avatar"
      />
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <hr />

      <p><b>Posts:</b> {user.post_count}</p>
      <p><b>Comments:</b> {user.comment_count}</p>
    </div>
  );
}

export default Profile;