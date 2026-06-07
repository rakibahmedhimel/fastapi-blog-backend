export const loginUser = async (email, password) => {
  const res = await fetch("https://fastapi-blog-backend-2y9w.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return res.json();
};