const BASE_URL = "https://fastapi-blog-backend-2y9w.onrender.com";

// 🔥 get comments
export const getComments = async (postId) => {
  const res = await fetch(`${BASE_URL}/comments/${postId}`);
  return res.json();
};

// 🔥 add comment
export const addComment = async (postId, content) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ content })
  });

  return res.json();
};