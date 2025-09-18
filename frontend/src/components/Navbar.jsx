'use client';
import { useState, useEffect } from "react";
import "./nav.css";
import { FaDiscord, FaInstagram, FaUser, FaHome, FaBook, FaSearch, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <>

      <header className={`header ${searchOpen ? "search-active" : ""}`}>
        <div className="header-left">
          <div className="logo">
            <Link href="/">
              <img src="/img/lunoxscan_site_logo.png" alt="LunoxScan Logo" />
            </Link>
          </div>
          <a
            href="https://discord.gg/WeZP2kEBjB"
            target="_blank"
            rel="noopener noreferrer"
            className="discord-btn"
            title="Rejoindre Discord"
          >
            <FaDiscord />
          </a>
          <a
            href="https://www.instagram.com/lunoxscan?igsh=MTFhY2g3N3dkcWJpbg=="
            target="_blank"
            rel="noopener noreferrer"
            className="insta-btn"
            title="Suivre sur Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link href="/catalogue" className="nav-link">
                <img src="/img/catalogue icon.png" alt="catalogue logo" />
                Catalogue
              </Link>
            </li>
          </ul>

          <button onClick={toggleSearch} className="nav-link search-btn">
            <FaSearch />
          </button>

          <div className="desktop-only profile-icon">
            <Link href="/profile" className="nav-link">
              <FaUser />
            </Link>
          </div>

          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>

      <div className={`search-bar ${searchOpen ? "open" : ""}`}>
        <input type="text"
          placeholder="Rechercher un manga..."
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          autoFocus
        />
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <span 
          className="close-btn" 
          onClick={closeMenu}
          aria-label="Fermer le menu"
        >
          &times;
        </span>
        <ul className="sidebar-menu">
          <li>
            <Link href="/" onClick={closeMenu}>
              <FaHome /> Accueil
            </Link>
          </li>
          <li>
            <Link href="/catalogue" onClick={closeMenu}>
              <FaBook /> Catalogue
            </Link>
          </li>
          <li>
            <a 
              href="https://discord.gg/WeZP2kEBjB" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <FaDiscord /> Discord
            </a>
          </li>
          <li>
            <a 
              href="https://www.instagram.com/lunoxscan?igsh=MTFhY2g3N3dkcWJpbg=="
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <FaInstagram /> Instagram
            </a>
          </li>
          <li>
            <Link href="/profile" onClick={closeMenu}>
              <FaUser /> Profil
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default Navbar;