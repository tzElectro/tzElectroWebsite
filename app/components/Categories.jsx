"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Categories({ categories = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative z-50 w-full py-12 bg-slate-950">
      {/* Main Background with Lamp Effect */}
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0">
        {/* Lamp Effect - now inside the main background */}
        <motion.div
          initial={{ opacity: 0.5, width: "30rem",height: "100px" }}
          whileInView={{ opacity: 1, width: "80rem",height: "800px"}} 
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute top-0 right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        />

        <motion.div
         initial={{ opacity: 0.5, width: "30rem",height: "100px" }}
         whileInView={{ opacity: 1, width: "80rem",height: "800px"}} 
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute top-0 left-1/2  h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        />

        <motion.h1
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="mb-8 bg-gradient-to-br from-slate-300 to-slate-500 py-6 bg-clip-text text-center text-3xl font-medium tracking-tight text-[#00FFFF] md:text-4xl"
        >
          Our Categories
        </motion.h1>

        {/* Categories Grid - now inside the same background */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-[5] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-[80%] mx-auto mt-16"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category?.id || index}
              variants={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group h-[300px] flex flex-col"
            >
              <Link href={`/categories/${category?.id}`} className="h-full w-full">
                <div className="relative rounded-3xl p-px overflow-hidden h-full bg-gradient-to-b from-neutral-800 via-neutral-800/50 to-neutral-800 transition-all duration-500 group-hover:shadow-[0_0_2rem_-0.5rem_#00FFFF] group-hover:bg-gradient-to-b group-hover:from-[#00FFFF]/20 group-hover:via-[#8A2BE2]/20 group-hover:to-[#FF1493]/20">
                  <div className="relative h-full w-full rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/10">
                    {category?.imageURL && (
                      <Image src={category.imageURL} alt={category?.name || "Category"} fill className="object-cover transition-transform duration-700 group-hover:scale-110" priority={index < 3} />
                    )}
                    <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                      <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#00FFFF] text-sm font-medium border border-white/10">
                        {category?.label || "LED Lighting"}
                      </span>
                      <h3 className="text-4xl font-bold mt-4 mb-4 text-white group-hover:text-[#00FFFF] transition-colors duration-300">
                        {category?.name || "Category"}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
