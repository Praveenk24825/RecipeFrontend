import React, { useRef, useState } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);

  if (!videoUrl) return null;

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="w-full rounded-lg shadow-lg mb-6 bg-gray-900 flex flex-col items-center">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full max-h-[600px] rounded-t-lg"
      />
      <div className="w-full flex justify-between items-center p-2 bg-gray-800 rounded-b-lg">
        {/* Volume */}
        <div className="flex items-center space-x-2 text-white">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-32"
          />
        </div>

        {/* Fullscreen button */}
        <button
          onClick={handleFullscreen}
          className="text-white font-semibold px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          ⛶ Fullscreen
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
