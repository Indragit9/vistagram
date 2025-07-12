import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token to every request if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const getPosts = () => API.get("/posts");
export const createPost = (formData) => API.post("/posts", formData);
export const likePost = (id, type) => API.patch(`/posts/${id}/like`, { type });
export const sharePost = (id) => API.patch(`/posts/${id}/share`);
export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);

export const uploadToBackend = (formData) => 
    API.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
