"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { GradientBorder } from "./ui/gradient-border";
import { AnimatedText } from "./ui/animated-text";
import { useCollections } from "@/lib/firestore/collections/read";
import { useState, useRef } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Collections() {
  const { data: collections } = useCollections();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Lamp effect moves down as user scrolls
  const lampY = useTransform(scrollYProgress, [0, 1], ["-50px", "100px"]);
  const lampOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  if (!collections?.length) return null;

  return (
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden bg-[#0A0A0A]">
      {/* Lamp Effect */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-48 h-48 bg-[#00FF9C] rounded-full blur-[100px] opacity-0"
        style={{
          y: lampY,
          opacity: lampOpacity,
        }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="max-w-7xl mx-auto mb-12 text-center relative">
          <AnimatedText
            text="EXPLORE COLLECTIONS"
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#00FFFF]  relative z-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-400"
          >
            Discover our carefully curated collections of premium lighting solutions
          </motion.p>
        </div>

        {/* Collections Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {collections.map((collection) => (
            <motion.div key={collection.id} variants={item}>
              <Link href={`/collections/${collection.id}`}>
                <GradientBorder className="h-full group relative block overflow-hidden rounded-lg border border-[#FF10F0]">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <Image
                      src={collection.imageURL.url}
                      alt={collection.title || "collection image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {collection.title || "Collection Title"}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </GradientBorder>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}