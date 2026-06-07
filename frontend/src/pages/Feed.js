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
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    await createPost(title, content);
    setTitle("");
    setContent("");
    fetchPosts();
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");

    await fetch(`https://fastapi-blog-backend-2y9w.onrender.com/likes/${postId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    fetchPosts(); // 🔥 reload real data
  };

  return (
    <div>
      <h2>Create Post</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <br />

      <button onClick={handleCreate}>Create</button>

      <h1>Posts</h1>

      {posts.map(post => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}

    </div>
  );
}

export default Feed;