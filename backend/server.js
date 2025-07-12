const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const postRoutes = require("./routes/postRoutes");

dotenv.config();

const app = express();
// app.use(cors());
// app.use(cors({
//     origin: [
//       "https://vistagram.vercel.app",      // 🔁 Replace with your actual Vercel domain
//       "http://localhost:3000"              // ✅ Optional: for local frontend dev
//     ],
//     credentials: true,
//   }));
app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for form data

// Mount routes
app.use("/api/posts", postRoutes);

app.use("/api/auth", authRoutes);


// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));
