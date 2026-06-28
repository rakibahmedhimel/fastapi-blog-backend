import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
  ];

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
          "https://i.pravatar.cc/150?img=12"
        }
        alt="avatar"
        className="profile-avatar"
      />
        <div>
          {avatars.map((avatar) => (
            <img
              key={avatar}
              src={avatar}
              alt=""
              className="avatar-option"
            />
          ))}
        </div>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <hr />

      <p><b>Posts:</b> {user.post_count}</p>
      <p><b>Comments:</b> {user.comment_count}</p>
      <p><b>Likes Given:</b> {user.likes_count}</p>
    </div>
  );
}

export default Profile;