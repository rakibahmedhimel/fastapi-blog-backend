import React, { useState } from "react";

function CommentBox({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onAdd(text);      // send to parent
    setText("");      // clear input
  };

  return (
    <form className="comment-box" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        className="comment-input"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn comment-btn"  type="submit">
        Add
      </button>
    </form>
  );
}

export default CommentBox;