import React, { useState } from "react";
import axios from "axios";

const Signup = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", { username, password });
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      onAuthSuccess(); // e.g., redirect or refresh
    } catch (err) {
      alert("Signup failed.");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
