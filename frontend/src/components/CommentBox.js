import React, { useState, forwardRef } from "react";

const CommentBox = forwardRef(({ onAdd }, ref) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onAdd(text);
    setText("");
  };

  return (
    <form
      className="comment-box"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        ref={ref}
        className="comment-input"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="btn comment-btn"
        type="submit"
      >
        Add
      </button>
    </form>
  );
});

export default CommentBox;