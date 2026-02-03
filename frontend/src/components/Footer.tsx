"use client";

import Link from "next/link";
import { Mail, Github, Instagram, Twitter, Globe, Share2 } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-secondary/50 pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Logo & Info */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <img
                                src="/img/lunoxscan_site_logo.png"
                                alt="LunoxScan Logo"
                                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                            The ultimate destination for premium manga, light novels, and original stories. Experience world-class reading with our custom-built dark engine.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Globe size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Share2 size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Explore</h4>
                        <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-white transition-colors">Popular</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">New Releases</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Top Ranked</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Collections</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Support</h4>
                        <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Account</h4>
                        <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-white transition-colors">Library</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Favorites</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">History</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Settings</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                        © 2024 LUNOXSCAN PLATFORM • DESIGNED FOR DARKNESS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8 text-[10px] text-muted-foreground uppercase tracking-widest">
                        <Link href="#" className="hover:text-primary transition-colors">Status</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Brand Assets</Link>
                        <Link href="#" className="hover:text-primary transition-colors">API</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
