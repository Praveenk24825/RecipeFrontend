// src/components/VideoPlayer.jsx
import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) return null;

  // If videoUrl starts with http (already full link), keep it.
  // Otherwise, prepend your backend domain (from VITE_API_URL).
  const finalUrl = videoUrl.startsWith("http")
    ? videoUrl
    : `${import.meta.env.VITE_API_URL.replace("/api", "")}${videoUrl}`;

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <video
        src={finalUrl}
        controls
        className="w-full rounded-lg shadow-lg"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
