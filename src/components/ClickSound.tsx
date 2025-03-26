import React, { useEffect, useRef } from "react";

interface ClickSoundProps {
  volume?: number;
  soundType?: "soft" | "mechanical" | "digital";
}

const ClickSound: React.FC<ClickSoundProps> = ({
  volume = 0.3,
  soundType = "mechanical",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audio.volume = volume;

    // Set sound based on type
    switch (soundType) {
      case "soft":
        audio.src =
          "https://assets.mixkit.co/sfx/preview/mixkit-light-switch-sound-2582.mp3";
        break;
      case "mechanical":
        audio.src =
          "https://assets.mixkit.co/sfx/preview/mixkit-mouse-click-close-1113.mp3";
        break;
      case "digital":
        audio.src =
          "https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3";
        break;
      default:
        audio.src =
          "https://assets.mixkit.co/sfx/preview/mixkit-mouse-click-close-1113.mp3";
    }

    audioRef.current = audio;

    // Add click event listener to document
    const handleClick = () => {
      if (audioRef.current) {
        // Reset audio to start if it's already playing
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          // Handle autoplay restrictions
          console.log("Audio play failed:", err);
        });
      }
    };

    document.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume, soundType]);

  return null; // This component doesn't render anything
};

export default ClickSound;
