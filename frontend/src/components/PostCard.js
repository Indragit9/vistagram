import React, { useState } from "react";

const PostCard = ({ post, onLike, onShare }) => {
    const [liked, setLiked] = useState(false);
  
    const handleLikeToggle = () => {
      onLike(post._id, liked ? "unlike" : "like");
      setLiked(!liked);
    };
  
    return (
      <div style={styles.card}>
        <h3>@{post.username}</h3>
  
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post" style={styles.image} />
        )}
  
        <p>{post.caption}</p>
        <div style={styles.footer}>
          <button onClick={handleLikeToggle}>
            {liked ? "💔 Unlike" : "❤️ Like"} {post.likes}
          </button>
          <button onClick={() => onShare(post._id)}>
            🔗 {post.shares}
          </button>
          <small>{new Date(post.timestamp).toLocaleString()}</small>
        </div>
      </div>
    );
  };
  
const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "20px",
    background: "#fff",
    width: "100%",
    maxWidth: "500px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default PostCard;
