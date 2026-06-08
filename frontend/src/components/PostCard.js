import React from "react";

function PostCard({ post, onLike }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        margin: "10px",
        padding: "10px"
      }}
    >
      <h4>👤 {post.author}</h4>
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <button onClick={() => onLike(post.id)}>
        ❤️ Like
      </button>

      <p>Likes: {post.likes}</p>
    </div>
  );
}

export default PostCard;