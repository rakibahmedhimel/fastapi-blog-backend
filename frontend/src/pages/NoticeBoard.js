import React, { useEffect, useState } from "react";
import { getNotices } from "../api/notice";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotices().then(setNotices);
  }, []);

  return (
    <div className="page-container">
      <h2>📢 Notice Board</h2>

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