import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    const file = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
    const caption = req.body.caption;

    const uploadRes = await cloudinary.v2.uploader.upload(file);

    res.status(200).json({ imageUrl: uploadRes.secure_url, caption });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
