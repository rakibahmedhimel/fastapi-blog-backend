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

export const createPost = async (title, content, image) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image) {
        formData.append("image", image);
    }

    const res = await fetch(`${BASE_URL}/posts/createpost`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
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