const BASE_URL = "https://fastapi-blog-backend-2y9w.onrender.com";

export const getNotices = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/notices`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return res.json();
};