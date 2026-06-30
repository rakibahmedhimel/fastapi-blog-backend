import React, { useEffect, useState } from "react";
import { getCurrentUser, uploadAvatar } from "../api/user";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getCurrentUser();
    setUser(data);
  };

  const handleUpload = async () => {
    if (!image) return;

    await uploadAvatar(image);

    setImage(null);

    // refresh profile
    loadUser();
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-card">

      <h2>👤 Profile</h2>

      <img
        src={
          user.avatar_url ||
          "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)
        }
        alt="avatar"
        className="profile-avatar"
      />

      <div className="avatar-upload">

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          className="upload-btn"
          onClick={handleUpload}
        >
          Update Profile Picture
        </button>

      </div>

      <div className="profile-info">

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

      </div>

      <hr />

      <div className="profile-stats">

        <div className="stat-card">
          <h3>{user.post_count}</h3>
          <span>Posts</span>
        </div>

        <div className="stat-card">
          <h3>{user.comment_count}</h3>
          <span>Comments</span>
        </div>

        <div className="stat-card">
          <h3>{user.likes_count}</h3>
          <span>Likes Given</span>
        </div>

      </div>

    </div>
  );
}

export default Profile;