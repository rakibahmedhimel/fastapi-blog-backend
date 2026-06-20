const BASE_URL = "https://fastapi-blog-backend-2y9w.onrender.com";

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.detail };
    }

    return data;

  } catch (err) {
    console.error("Login error:", err);
    return { error: "Server error" };
  }
};