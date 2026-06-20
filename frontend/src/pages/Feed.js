import React, { useEffect, useState } from "react";
import { getPosts, createPost } from "../api/post";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data.data || []);
  };

  useEffect(() => {
    fetchPosts(); // ✅ load posts on page load
  }, []);

  const handleCreate = async () => {
    if (!title || !content) return;

    await createPost(title, content);
    setTitle("");
    setContent("");

    fetchPosts(); // reload posts
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");

    await fetch(`https://fastapi-blog-backend-2y9w.onrender.com/likes/${postId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    fetchPosts(); // refresh likes
  };

  return (
    <div className="container">

      <div className="header">
        <h1>📚 Batch Feed</h1>

        <button className="logout" onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}>
          Logout
        </button>
      </div>

      <div className="create-box">
        <h3>Create Post</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button className="create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>

      {posts.map(post => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}

    </div>
  );
}

export default Feed;