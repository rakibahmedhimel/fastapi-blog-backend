import React, { useEffect, useState } from "react";
import { getMyPosts } from "../api/post";

function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMyPosts().then(setPosts);
  }, []);

  return (
    <div className="page-container">
      <h2>📝 My Posts</h2>

      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPosts;