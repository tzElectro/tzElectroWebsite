"use client";

import { motion } from "framer-motion";

export const GradientBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative rounded-xl ${className} p-[1px] overflow-hidden`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, #00A3FF, #6C72CB, #FF6B6B)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative rounded-xl bg-slate-950 p-4">
        {children}
      </div>
    </div>
  );
};
