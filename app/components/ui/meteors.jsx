"use client";

import { useEffect, useState } from "react";

export const Meteors = ({ number = 20, className = "" }) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...Array(number)].map(() => ({
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 1 + "s",
      animationDuration: Math.random() * 1 + 0.6 + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']"
          style={style}
        />
      ))}
    </div>
  );
};
