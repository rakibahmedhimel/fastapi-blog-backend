import React, { useEffect, useState, useRef  } from "react";
import { getPosts, createPost } from "../api/post";
import PostCard from "../components/PostCard";
import "../styles/feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data.data || []);
  };

  useEffect(() => {
    fetchPosts(); // ✅ load posts on page load
  }, []);

  const handleCreate = async () => {
    if (!title && !content && !image) return;

    await createPost(title, content, image);

    setTitle("");
    setContent("");
    setImage(null);      // ✅ Reset selected image
    fileRef.current.value = ""; 
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

    fetchPosts(); // refresh likes
  };
  
  return (
    <div className="page-container">

      <div className="header">
        <h1>📚 Batch Feed</h1>
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

        <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files[0])}
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