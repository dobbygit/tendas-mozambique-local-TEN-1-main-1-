import React from "react";
import { motion } from "framer-motion";

interface BackgroundTreesProps {
  count?: number;
  opacity?: number;
  className?: string;
}

const BackgroundTrees = ({
  count = 10,
  opacity = 0.1,
  className = "",
}: BackgroundTreesProps) => {
  // Generate random positions for trees
  const trees = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // random x position (0-100%)
    y: Math.random() * 100, // random y position (0-100%)
    scale: 0.5 + Math.random() * 0.5, // random scale between 0.5 and 1
    rotation: -5 + Math.random() * 10, // random rotation between -5 and 5 degrees
  }));

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}
    >
      {trees.map((tree) => (
        <motion.div
          key={tree.id}
          className="absolute"
          style={{
            left: `${tree.x}%`,
            top: `${tree.y}%`,
            opacity,
          }}
          initial={{ opacity: 0, scale: tree.scale * 0.8 }}
          animate={{ opacity, scale: tree.scale }}
          transition={{ duration: 1, delay: tree.id * 0.1 }}
        >
          <svg
            width="100"
            height="120"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: `rotate(${tree.rotation}deg) scale(${tree.scale})`,
            }}
          >
            <path
              d="M50 0L65 30L80 60L65 90H35L20 60L35 30L50 0Z"
              fill="currentColor"
              className="text-green-900 dark:text-green-700"
            />
            <rect x="45" y="90" width="10" height="30" fill="#8B4513" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundTrees;
