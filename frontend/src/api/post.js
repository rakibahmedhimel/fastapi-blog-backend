const BASE_URL = "https://fastapi-blog-backend-2y9w.onrender.com";

export const getPosts = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/posts`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return res.json();
};

export const createPost = async (title, content, postUrl) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/posts/createpost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ title, content, postUrl })
  });

  return res.json();
};

export const getMyPosts = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/posts/me`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return res.json();
};