import React, { useRef, useState } from "react";
import { uploadToBackend } from "../api";

export default function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch(console.error);
  };

  const captureImage = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 300, 150);

    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "captured.jpg");
      formData.append("caption", caption);

      const result = await uploadToBackend(formData);
      setUploadedUrl(result.imageUrl);
    }, "image/jpeg");
  };

  return (
    <div>
      <video ref={videoRef} width="300" height="150" autoPlay />
      <br />
      <button onClick={startCamera}>Start Camera</button>
      <br />
      <input
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <br />
      <button onClick={captureImage}>Capture & Upload</button>
      <canvas ref={canvasRef} width="300" height="150" style={{ display: "none" }} />
      {uploadedUrl && (
        <div>
          <h4>Uploaded Image:</h4>
          <img src={uploadedUrl} width="300" alt="Uploaded" />
          <p><strong>Caption:</strong> {caption}</p>
        </div>
      )}
    </div>
  );
}
