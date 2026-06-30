import { useState, useEffect, useRef } from "react";
import { getComments, addComment } from "../api/comment";
import CommentBox from "./CommentBox";
import {format, formatDistanceToNow } from "date-fns";
import "../styles/post.css";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
//import { BsThreeDots } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

function PostCard({ post, onLike }) {
  console.log(post);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const commentInputRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

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
        <div className="post-user">
          <img
            src={post.avatar_url || "/default-avatar.png"}
            className="post-avatar"
            alt=""
        />
          <div>

            <div className="author">{post.author}</div>

            <div className="post-time">
                {format(new Date(post.created_at),"PPP p")}
            </div>

          </div>
        </div>
        <div className="menu-wrapper">

                <button
                    className="more-btn"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <BsThreeDotsVertical/>
                </button>

                {showMenu && (
                    <div className="dropdown-menu">

                        <button>Edit</button>

                        <button className="delete-option">
                            Delete
                        </button>

                    </div>
                )}

        </div>
      </div>

      <div
        className={`post-layout ${
          post.id % 2 === 0 ? "reverse" : ""
        }`}
      >

        {post.post_url && (
          <div className="image-side">
            <img
                src={post.post_url}
                className="post-image"
                alt={post.title}
            />
          </div>
        )}

        <div className="content-side">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>

      </div>

      
      <div className="post-actions">

          <button
              className={`action-btn ${post.liked_by_user ? "liked" : ""}`}
              onClick={() => onLike(post.id)}
          >
              {post.liked_by_user ? <FaHeart/> : <FaRegHeart/>}
              <span>{post.likes ?? 0}</span>
          </button>

          <button
              className="action-btn"
              onClick={()=>{
                  setShowComments(!showComments);

                  setTimeout(()=>{
                      commentInputRef.current?.focus();
                  },100);
              }}
          >
              <FaRegCommentDots/>
              <span>{comments.length}</span>
          </button>

          <button className="action-btn">
              <FaShare/>
              <span>Share</span>
          </button>

      </div>

      {showComments && (
        <div className="comments">

          <h4 className="comment-title">
            Comments ({comments.length})
          </h4>

          {comments.map(c => (
            <div key={c.id} className="comment-card">

              <div className="comment-header">

                <img
                  src={c.avatar_url || "https://i.pravatar.cc/100"}
                  className="comment-avatar"
                  alt=""
                />

                <div className="comment-user">

                  <div className="comment-author">
                    {c.author}
                  </div>

                  <div className="comment-time">
                    {formatDistanceToNow(
                      new Date(c.created_at),
                      { addSuffix: true }
                    )}
                  </div>

                </div>

              </div>

              <div className="comment-content">
                {c.content}
              </div>

              <div className="comment-actions">

                <button>
                  <i className="fa-regular fa-heart"></i>
                  Like
                </button>

                <button>
                  <i className="fa-solid fa-reply"></i>
                  Reply
                </button>

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