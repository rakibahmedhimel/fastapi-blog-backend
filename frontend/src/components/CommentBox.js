import React, { useState } from "react";

function CommentBox({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onAdd(text);      // send to parent
    setText("");      // clear input
  };

  return (
    <div className="comment-box">
      <input
        className="comment-input"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn comment-btn" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default CommentBox;