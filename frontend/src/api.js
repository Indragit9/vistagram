// // src/api.js
// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://localhost:5000/api",
// // });

// // export const getPosts = () => API.get("/posts");

// // export const likePost = (id, type = "like") =>
// //   API.patch(`/posts/${id}/like`, { type });

// // export const sharePost = (id) =>
// //   API.patch(`/posts/${id}/share`);

// // src/api.js
// // src/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach token to every request if available
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // 👈 Important!
//   }
//   return config;
// });

// export const getPosts = () => API.get("/posts");
// export const likePost = (id, type = "like") => API.patch(`/posts/${id}/like`, { type });
// export const sharePost = (id) => API.patch(`/posts/${id}/share`);
// export const createPost = (formData) =>
//   API.post("/posts", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

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

// export const getPosts = () => API.get("/posts");

// export const likePost = (id, type = "like") =>
//   API.patch(`/posts/${id}/like`, { type });

// export const sharePost = (id) => API.patch(`/posts/${id}/share`);

// export const loginUser = (credentials) => API.post("/auth/login", credentials);

// export const registerUser = (userData) => API.post("/auth/register", userData);

// export const createPost = (formData) =>
//   API.post("/posts", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

export const getPosts = () => API.get("/posts");
export const createPost = (formData) => API.post("/posts", formData);
export const likePost = (id, type) => API.patch(`/posts/${id}/like`, { type });
export const sharePost = (id) => API.patch(`/posts/${id}/share`);
export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
