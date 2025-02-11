"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";
import HeaderClientButtons from "./HeaderClientButtons";
import AdminButton from "./AdminButton";
import { Meteors } from "./ui/meteors";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Collections", link: "/collections" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Services", link: "/services" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}`}
    >
      {/* Background Effects */}
      <Meteors number={20} />

      <div className="relative z-10 mx-auto flex items-center justify-between px-6 py-4 max-w-7xl">
        {/* Logo */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF1493] text-transparent bg-clip-text">
              TZ ELECTRO
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2]" />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {menuList.map((item) => (
            <Link key={item.name} href={item.link} className="relative group">
              <motion.span whileHover={{ y: -2 }} className="text-white/90 hover:text-white transition-colors">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <AuthContextProvider>
            <HeaderClientButtons />
            <AdminButton />
            <LogoutButton />
          </AuthContextProvider>

          <Link href="/search">
            <motion.button whileHover={{ scale: 1.1 }} className="text-white/90 hover:text-white">
              <Search size={20} />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-8"
        >
          <motion.button
            className="absolute top-5 right-5 text-white"
            onClick={() => setIsMenuOpen(false)}
            whileTap={{ scale: 0.9 }}
          >
            <X size={28} />
          </motion.button>
          {menuList.map((item) => (
            <Link key={item.name} href={item.link} onClick={() => setIsMenuOpen(false)} className="text-white/90 hover:text-white text-xl">
              {item.name}
            </Link>
          ))}
          <AuthContextProvider>
            <HeaderClientButtons />
            <AdminButton />
            <LogoutButton />
          </AuthContextProvider>
        </motion.div>
      )}
    </nav>
  );
}
