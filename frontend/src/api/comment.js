const BASE_URL = "https://fastapi-blog-backend-2y9w.onrender.com";

// 🔥 GET COMMENTS
export const getComments = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/${postId}`);

    if (!res.ok) throw new Error("Failed to fetch comments");

    return await res.json();
  } catch (error) {
    console.error("Fetch comments error:", error);
    return [];
  }
};


// 🔥 ADD COMMENT
export const addComment = async (postId, content) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${BASE_URL}/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ content })
    });

    if (!res.ok) {
      throw new Error("Failed to add comment");
    }

    return await res.json();

  } catch (error) {
    console.error("Comment error:", error);
    return null;
  }
};