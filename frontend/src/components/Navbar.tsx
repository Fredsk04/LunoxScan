"use client";

import { useState, useEffect } from "react";
import { Search, User, Menu, X, Crown, LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await fetch("/api/auth/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    } else {
                        localStorage.removeItem("token");
                        setUser(null);
                    }
                } catch (e) {
                    console.error("Failed to fetch user in Navbar", e);
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
        };
        fetchUser();

        const handleProfileUpdate = () => {
            fetchUser();
        };

        window.addEventListener("profileUpdate", handleProfileUpdate);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("profileUpdate", handleProfileUpdate);
        };
    }, []);

    const navLinks = [
        { name: "Discovery", href: "/" },
        { name: "Catalogue", href: "/catalogue" },
        { name: "Originals", href: "/originals" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/img/lunoxscan_site_logo.png"
                            alt="LunoxScan Logo"
                            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>

                    {/* Discord Link */}
                    <a
                        href="https://discord.gg/ZKVbPxYxj6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2] hover:text-white rounded-lg transition-all duration-300 border border-[#5865F2]/20"
                        title="Join our Discord"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                        </svg>
                    </a>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-5">
                    <div className="relative group flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-0 group-hover:w-64 focus:w-64 transition-all duration-300 bg-white/5 border-none rounded-full px-0 group-hover:px-4 focus:px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = `/catalogue?q=${(e.target as HTMLInputElement).value}`;
                                }
                            }}
                        />
                        <button className="p-2 text-white/40 hover:text-white transition-colors">
                            <Search size={22} />
                        </button>
                    </div>
                    {user?.role === 'admin' && (
                        <Link href="/admin/dashboard" className="px-5 py-2 glass hover:bg-white/10 rounded-full text-white text-[9px] font-black uppercase tracking-widest transition-all">
                            Admin
                        </Link>
                    )}
                    <Link href="/premium" className="px-5 py-2 bg-primary hover:bg-primary/90 rounded-full text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                        <Crown size={14} />
                        Premium
                    </Link>
                    {user ? (
                        <div className="relative group">
                            <button className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-all border border-primary/30 overflow-hidden">
                                {user?.avatar_url ? (
                                    <img src={`${user.avatar_url}`} alt={user.username} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={20} className="text-primary" />
                                )}
                            </button>
                            <div className="absolute right-0 mt-2 w-48 glass rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:scale-100 scale-95 z-[60]">
                                <div className="px-4 py-3 border-b border-white/5 mb-2 text-center">
                                    <p className="text-sm font-black truncate text-primary">{user.username}</p>
                                </div>
                                <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-[10px] font-black uppercase tracking-widest">
                                    <User size={14} />
                                    Account
                                </Link>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href = '/auth';
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 text-destructive rounded-xl transition-colors text-[10px] font-black uppercase tracking-widest w-full text-left"
                                >
                                    <LogOut size={14} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link href="/auth" className="px-6 py-2.5 glass border-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                            Connect
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="md:hidden fixed inset-0 top-[72px] bg-background/95 backdrop-blur-2xl z-[100] p-10 flex flex-col items-center gap-10"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-3xl font-black uppercase tracking-tighter"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-4 w-full pt-10 border-t border-white/10">
                            <Link
                                href="/premium"
                                className="w-full py-4 bg-primary rounded-2xl text-center font-black uppercase tracking-widest text-xs"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Star Membership
                            </Link>
                            {!user && (
                                <Link
                                    href="/auth"
                                    className="w-full py-4 glass rounded-2xl text-center font-black uppercase tracking-widest text-xs"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Log In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
