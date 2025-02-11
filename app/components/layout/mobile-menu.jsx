"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 focus:outline-none"
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-5 flex flex-col justify-between"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 8 },
            }}
            className="w-full h-0.5 bg-white block"
          />
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className="w-full h-0.5 bg-white block"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -8 },
            }}
            className="w-full h-0.5 bg-white block"
          />
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <MobileNavLink href="/products" onClick={() => setIsOpen(false)}>
                Products
              </MobileNavLink>
              <MobileNavLink href="/collections" onClick={() => setIsOpen(false)}>
                Collections
              </MobileNavLink>
              <MobileNavLink href="/categories" onClick={() => setIsOpen(false)}>
                Categories
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileNavLink = ({ href, children, onClick }) => {
  return (
    <Link href={href} onClick={onClick}>
      <motion.span
        className="text-2xl font-medium text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
    </Link>
  );
};
