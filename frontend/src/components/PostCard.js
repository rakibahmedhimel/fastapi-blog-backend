import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../api/comment";

function PostCard({ post, onLike }) {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 🔥 load comments
  const fetchComments = async () => {
    const data = await getComments(post.id);
    setComments(data || []);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 🔥 add comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    await addComment(post.id, newComment);
    setNewComment("");
    fetchComments(); // reload
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

      {/* 🔥 COMMENTS SECTION */}
      <hr />

      <h4>💬 Comments</h4>

      {comments.map(c => (
        <p key={c.id}>
          <b>{c.author}:</b> {c.content}
        </p>
      ))}

      {/* 🔥 ADD COMMENT */}
      <input
        placeholder="Write a comment..."
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