"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const AnimatedCard = ({
  children,
  className,
  imageUrl,
  title,
  description,
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-black to-slate-950 p-4 group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity group-hover:opacity-100"
        animate={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transform transition-transform group-hover:scale-110"
            />
          </div>
        )}
        {title && (
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
        {children}
      </div>
    </motion.div>
  );
};
