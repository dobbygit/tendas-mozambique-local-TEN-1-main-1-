import React from "react";

interface BackgroundTreesProps {
  count?: number;
  opacity?: number;
}

const BackgroundTrees: React.FC<BackgroundTreesProps> = ({
  count = 10,
  opacity = 0.1,
}) => {
  // Generate random positions for trees
  const trees = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // Random x position (0-100%)
    y: Math.random() * 100, // Random y position (0-100%)
    scale: 0.5 + Math.random() * 1.5, // Random scale (0.5-2)
    rotation: Math.random() * 10 - 5, // Random slight rotation (-5 to 5 degrees)
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {trees.map((tree) => (
        <div
          key={tree.id}
          className="absolute"
          style={{
            left: `${tree.x}%`,
            top: `${tree.y}%`,
            transform: `scale(${tree.scale}) rotate(${tree.rotation}deg)`,
            opacity: opacity,
          }}
        >
          <svg
            width="50"
            height="80"
            viewBox="0 0 50 80"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M25 0L50 30H37.5L50 60H30L25 80L20 60H0L12.5 30H0L25 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default BackgroundTrees;
