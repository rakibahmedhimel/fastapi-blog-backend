const BASE_URL = "https://fastapi-blog-backend-2y9w.onrender.com";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return res.json();
};


export const uploadAvatar = async (image) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(`${BASE_URL}/users/avatar`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    });

    return res.json();
};