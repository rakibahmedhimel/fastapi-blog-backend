import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../api/comment";
import CommentBox from "./CommentBox";

function PostCard({ post, onLike }) {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getComments(post.id);
      setComments(data || []);
    };

    load();
  }, [post.id]);

  const handleAddComment = async (text) => {
    const newC = await addComment(post.id, text);

    if (newC) {
      setComments(prev => [...prev, newC]);
    }
  };

  return (
    <div className="post-card">

      <div className="post-header">
        <span className="author">👤 {post.author}</span>
      </div>

      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <div className="post-actions">
        <button className="btn like-btn" onClick={() => onLike(post.id)}>
          {post.liked_by_user ? "💔 Unlike" : "❤️ Like"}
        </button>
        <span className="likes">Likes: {post.likes ?? 0}</span>
      </div>

      <div className="comments">
        <h4>💬 Comments</h4>

        {comments.map(c => (
          <p key={c.id} className="comment">
            <b>{c.author}:</b> {c.content}
          </p>
        ))}

        <CommentBox onAdd={handleAddComment} />
      </div>

    </div>
  );
}

export default PostCard;