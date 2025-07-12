// import React, { useState } from "react";
// import axios from "axios";

// const PostForm = ({ onUploadSuccess }) => {
//   const [caption, setCaption] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!imageFile || !caption) {
// //       alert("Please provide an image and caption.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("caption", caption);
// //     formData.append("image", imageFile);

// //     setLoading(true);
// //     console.log("Caption:", caption);
// //     console.log("ImageFile:", imageFile);

// //     try {
        
// //         // const res = await axios.post("/api/posts", formData); // no headers
// //         const token = localStorage.getItem("token");
// //         const res = await axios.post("/api/posts", formData, {
// //         headers: {
// //             "Authorization": `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //         },
// //         });

// //         console.log("Upload success:", res.data);
// //         setCaption("");
// //         setImageFile(null);
// //         onUploadSuccess();
// //       } catch (err) {
// //       console.error("Upload failed:", err);
// //       alert("Failed to upload post");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
//     const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!imageFile || !caption) {
//       alert("Please provide an image and caption.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("caption", caption);
//     formData.append("image", imageFile);
  
//     setLoading(true);
//     console.log("Caption:", caption);
//     console.log("ImageFile:", imageFile);
  
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to create a post.");
//         setLoading(false);
//         return;
//       }
  
//       const res = await axios.post("/api/posts", formData, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       console.log("Upload success:", res.data);
//       setCaption("");
//       setImageFile(null);
//       onUploadSuccess();
//     } catch (err) {
//       console.error("Upload failed:", err.response?.data || err.message);
//       alert("Failed to upload post");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <h2>Create a Post</h2>
//       <input
//         type="file"
//         accept="image/*"
//         capture="environment"
//         onChange={handleImageChange}
//       />
//       <input
//         type="text"
//         placeholder="Enter a caption..."
//         value={caption}
//         onChange={(e) => setCaption(e.target.value)}
//         style={styles.input}
//       />
//       <button type="submit" disabled={loading} style={styles.button}>
//         {loading ? "Uploading..." : "Post"}
//       </button>
//     </form>
//   );
// };



// export default PostForm;


import React, { useState } from "react";
import { createPost } from "../api"; // <-- import from centralized API file

const PostForm = ({ onUploadSuccess }) => {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || !caption) {
      alert("Please provide an image and caption.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imageFile);

    setLoading(true);

    try {
      await createPost(formData); // 🔁 Use from api.js
      setCaption("");
      setImageFile(null);
      onUploadSuccess();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Failed to upload post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create a Post</h2>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
      />
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={styles.input}
      />
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Uploading..." : "Post"}
      </button>
    </form>
  );
};

const styles = {
    form: {
      marginBottom: "20px",
      padding: "16px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      marginBottom: "10px",
      fontSize: "16px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

export default PostForm;
