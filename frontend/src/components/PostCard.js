import { useState, useEffect, useRef } from "react";
import { getComments, addComment } from "../api/comment";
import CommentBox from "./CommentBox";
import {format, formatDistanceToNow } from "date-fns";


function PostCard({ post, onLike }) {
  console.log(post);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const commentInputRef = useRef(null);

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
      setShowComments(true);
    }
  };

  return (
    <div className="post-card">

      <div className="post-header">

        <img
          className="post-avatar"
          src="https://i.pravatar.cc/150?img=12"
          alt=""
        />

        <div>
          <div className="author">
            {post.author}
          </div>

          <div className="post-time">
            {format(new Date(post.created_at), "PPP p")}
          </div>
        </div>

      </div>

      <div className="post-content">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {post.post_url && (
          <img
            src={post.post_url}
            alt="post"
            className="post-image"
          />
        )}        
      </div>

      
      <div className="post-actions">

        <button
          className={`action-btn ${
            post.liked_by_user ? "liked" : ""
          }`}
          onClick={() => onLike(post.id)}
        >
          👍 {post.likes ?? 0}
        </button>

        <button
          className="action-btn"
          onClick={() => {
            const newState = !showComments;

            setShowComments(newState);

            if (newState) {
              setTimeout(() => {
                commentInputRef.current?.focus();
              }, 100);
            }
          }}
        >
          💬 {comments.length}
        </button>

      </div>
      {showComments && (
      <div className="comments">
        <h4>💬 Comments</h4>

        {comments.map(c => (
          <div key={c.id} className="comment-card">

            <div className="comment-author">
              {c.author}
            </div>

            <div className="comment-time">
              {formatDistanceToNow(
                new Date(c.created_at),
                { addSuffix: true }
              )}
            </div>

            <div className="comment-content">
              {c.content}
            </div>

          </div>
        ))}

        <CommentBox
          ref={commentInputRef}
          onAdd={handleAddComment}
        />        
      </div>
    )}
    </div>
  );

}

export default PostCard;