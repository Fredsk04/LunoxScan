'use client'
import { useState, useEffect } from "react";
import { FaDiscord, FaInstagram, FaUser, FaHome, FaBook } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between h-24 px-[8%] bg-gradient-to-br from-purple-700 to-blue-700 shadow-md relative z-10">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Image 
            src="/image/lunox scan logo.png" 
            alt="logo" 
            className="h-10 w-auto select-none" 
            width={120}   
            height={40}  
            />
          </Link>

          <Link
            href="https://discord.gg/WeZP2kEBjB"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 bg-[#5865F2] rounded-full text-white hover:bg-[#4752c4] transition-colors"
          >
            <FaDiscord size={20} />
          </Link>

          <Link
            href="https://www.instagram.com/lunoxscan?igsh=MTFhY2g3N3dkcWJpbg=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-700 hover:opacity-80 transition-opacity"
          >
            <FaInstagram size={20} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-white text-sm hover:text-yellow-200 transition-colors">
            Catalogue
          </Link>
          <Link href="#" className="text-white hover:text-yellow-200">
            <FaUser size={18} />
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1 ml-auto z-20 ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="block w-6 h-0.5 bg-white transition-all"></span>
          <span className="block w-6 h-0.5 bg-white transition-all"></span>
          <span className="block w-6 h-0.5 bg-white transition-all"></span>
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-purple-700 to-blue-700 text-white z-40 p-5 rounded-r-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-white text-3xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        <ul className="mt-24 space-y-6">
          <li className="flex items-center gap-3 hover:text-purple-500 cursor-pointer">
            <FaHome /> Accueil
          </li>
          <li className="flex items-center gap-3 hover:text-purple-500 cursor-pointer">
            <FaBook /> Catalogue
          </li>
          <li className="flex items-center gap-3 hover:text-purple-500 cursor-pointer">
            <FaDiscord /> Discord
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
