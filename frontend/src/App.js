// // src/App.js
// import React, { useEffect, useState } from "react";
// import PostCard from "./components/PostCard";
// import PostForm from "./components/PostForm";
// import { getPosts, likePost, sharePost } from "./api";

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   // Fetch all posts from the backend
//   const loadPosts = async () => {
//     try {
//       const res = await getPosts();
//       console.log("Fetched posts:", res.data); // ← Add this
//       setPosts(res.data);
//     } catch (err) {
//       console.error("Failed to load posts:", err);
//     }
//   };

//   // Like or unlike a post
//   const handleLike = async (postId, type = "like") => {
//     try {
//       await likePost(postId, type); // "like" or "unlike"
//       loadPosts(); // Refresh after like/unlike
//     } catch (err) {
//       console.error("Error updating like:", err);
//     }
//   };

//   // Share a post
//   const handleShare = async (postId) => {
//     try {
//       await sharePost(postId);
//       loadPosts(); // Refresh after share
//     } catch (err) {
//       console.error("Error sharing post:", err);
//     }
//   };

//   useEffect(() => {
//     loadPosts(); // Load posts on initial render
//   }, []);

//   return (
//     <div style={styles.app}>
//       <h1>📸 Vistagram Timeline</h1>

//       {/* Post Creation Form */}
//       <PostForm onUploadSuccess={loadPosts} />

//       {/* Timeline */}
//       {posts.length === 0 ? (
//         <p>No posts available. Create one!</p>
//       ) : (
//         posts.map((post) => (
//           <PostCard
//             key={post._id}
//             post={post}
//             onLike={handleLike}
//             onShare={handleShare}
//           />
//         ))
//       )}
//     </div>
//   );
// }

// const styles = {
//   app: {
//     maxWidth: "600px",
//     margin: "auto",
//     padding: "20px",
//     fontFamily: "sans-serif",
//     background: "#f4f4f4",
//     minHeight: "100vh",
//   },
// };

// export default App;

// src/App.js
import React, { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getPosts, likePost, sharePost } from "./api";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const loadPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  };

  const handleLike = async (postId, type = "like") => {
    try {
      await likePost(postId, type);
      loadPosts();
    } catch (err) {
      console.error("Error updating like:", err);
    }
  };

  const handleShare = async (postId) => {
    try {
      await sharePost(postId);
      loadPosts();
    } catch (err) {
      console.error("Error sharing post:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) loadPosts();
  }, [isLoggedIn]);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    loadPosts();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div style={styles.app}>
      <h1>📸 Vistagram Timeline</h1>

      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          <PostForm onUploadSuccess={loadPosts} />
          {posts.length === 0 ? (
            <p>No posts available. Create one!</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onLike={handleLike}
                onShare={handleShare}
              />
            ))
          )}
        </>
      ) : (
        <>
          <Login onAuthSuccess={handleAuthSuccess} />
          <Signup onAuthSuccess={handleAuthSuccess} />
        </>
      )}
    </div>
  );
}

const styles = {
  app: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "sans-serif",
    background: "#f4f4f4",
    minHeight: "100vh",
  },
  logoutBtn: {
    background: "crimson",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px"
  }
};

export default App;

