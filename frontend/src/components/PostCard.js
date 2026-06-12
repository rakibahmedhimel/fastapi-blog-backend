import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../api/comment";

function PostCard({ post, onLike }) {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 🔥 load comments
  useEffect(() => {
    const load = async () => {
      const data = await getComments(post.id);
      setComments(data || []);
    };

    load();
  }, [post.id]);


  // 🔥 add comment (FIXED)
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const newC = await addComment(post.id, newComment);

    if (newC) {
      // ✅ instantly update UI (NO refresh needed)
      setComments(prev => [...prev, newC]);
      setNewComment("");
    }
  };


  return (
    <div style={{
      border: "1px solid gray",
      margin: "10px",
      padding: "10px"
    }}>

      <h4>👤 {post.author}</h4>
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <button onClick={() => onLike(post.id)}>
        {post.liked_by_user ? "💔 Unlike" : "❤️ Like"}
      </button>

      <p>Likes: {post.likes ?? 0}</p>

      <hr />

      <h4>💬 Comments</h4>

      {comments.map(c => (
        <p key={c.id}>
          <b>{c.author}:</b> {c.content}
        </p>
      ))}

      <input
        placeholder="Write comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button onClick={handleAddComment}>
        Add
      </button>

    </div>
  );
}

export default PostCard;