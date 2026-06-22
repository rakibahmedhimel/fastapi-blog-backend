import React, { useEffect, useState } from "react";
import { getNotices, createNotice } from "../api/notice";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const loadNotices = async () => {
    const data = await getNotices();
    setNotices(data || []);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleCreate = async () => {
    await createNotice(
      title,
      content,
      imageUrl
    );

    setTitle("");
    setContent("");
    setImageUrl("");

    loadNotices();
  };

  return (
    <div className="page-container">
      <h2>📢 Notice Board</h2>

      <div className="create-box">

        <h3>Create Notice</h3>

        <input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Notice content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button onClick={handleCreate}>
          Post Notice
        </button>

      </div>

      {notices.map(notice => (
        <div key={notice.id} className="notice-card">

          {notice.title && (
            <h3>{notice.title}</h3>
          )}

          {notice.content && (
            <p>{notice.content}</p>
          )}

          {notice.image_url && (
            <img
              src={notice.image_url}
              alt=""
              className="notice-image"
            />
          )}

        </div>
      ))}
    </div>
  );
}

export default NoticeBoard;