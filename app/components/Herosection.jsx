"use client";

import { motion } from "framer-motion";
import { Spotlight } from "./ui/spotlight";
import { Meteors } from "./ui/meteors";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] -mt-[76px] pt-[76px]">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#8A2BE2]/20 to-[#00FFFF]/20 opacity-30" />
        
        {/* LED Grid Effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Animated Light Streaks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[600px] w-[2px]"
            style={{
              background: "linear-gradient(to bottom, transparent, #00FFFF, transparent)",
              left: `${5 + i * 20}%`,
              opacity: 0.3,
            }}
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <Spotlight className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF1493]">
                Illuminate Your World
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Transform your space with premium{" "}
              <span className="text-[#00FFFF]">LED strips</span>,{" "}
              <span className="text-[#FF1493]">infinity cubes</span>, and{" "}
              <span className="text-[#8A2BE2]">dynamic lighting</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-white font-medium shadow-lg shadow-[#00FFFF]/25 hover:shadow-[#00FFFF]/50 transition-shadow"
                >
                  Explore Products
                </motion.button>
              </Link>
              <Link href="/collections">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-white/10 text-white font-medium backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  View Collections
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </Spotlight>

        {/* Floating Orbs */}
        <Meteors number={20} />
      </div>
    </div>
  );
}
