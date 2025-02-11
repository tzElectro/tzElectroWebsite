"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  if (imageList?.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Product Image with Zoom Effect */}
      <div className="flex justify-center w-full">
        <motion.img
          key={selectedImage}
          src={selectedImage}
          className="object-cover h-[350px] md:h-[430px] rounded-lg shadow-lg border-2 border-[#0091FF] hover:shadow-blue-500 transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      </div>
      
      {/* Thumbnail Slider */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
        {imageList?.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => setSelectedImage(item)}
            className={`w-[80px] border-2 p-2 cursor-pointer transition-all rounded-lg flex-shrink-0 ${
              selectedImage === item ? "border-blue-500 shadow-blue-500 shadow-md" : "border-gray-300"
            }`}
            whileHover={{ scale: 1.1, borderColor: "#0091FF" }}
          >
            <img className="object-cover rounded-md" src={item} alt="Thumbnail" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
