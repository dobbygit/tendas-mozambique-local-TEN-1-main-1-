import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickPosition {
  x: number;
  y: number;
  id: number;
}

const ClickEffect = () => {
  const [clicks, setClicks] = useState<ClickPosition[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create a new click effect
      const newClick = {
        x: e.clientX,
        y: e.clientY,
        id: nextId,
      };

      setClicks((prev) => [...prev, newClick]);
      setNextId((prev) => prev + 1);

      // Remove the click effect after animation completes
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 600);
    };

    // Add click event listener
    document.addEventListener("click", handleClick);

    // Clean up
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [nextId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="absolute w-12 h-12 -ml-6 -mt-6"
            style={{ left: click.x, top: click.y }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full h-full rounded-full border border-primary dark:border-green-400 flex items-center justify-center">
              <div className="w-1/4 h-1/4 rounded-full bg-primary dark:bg-green-400"></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickEffect;
