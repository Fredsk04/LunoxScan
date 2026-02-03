"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, Play, Bookmark, Share2, MessageSquare, Clock, BookOpen, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SeriesDetails({ params }: { params: { id: string } }) {
    const [series, setSeries] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [tab, setTab] = useState<"chapters" | "reviews" | "related">("chapters");

    useEffect(() => {
        const fetchSeries = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`http://localhost:4000/api/mangas/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setSeries(data);
                }

                if (token) {
                    const [wlRes, favRes] = await Promise.all([
                        fetch("http://localhost:4000/api/watchlist", {
                            headers: { Authorization: `Bearer ${token}` }
                        }),
                        fetch("http://localhost:4000/api/favorites", {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                    ]);

                    if (wlRes.ok) {
                        const wl = await wlRes.json();
                        setIsBookmarked(wl.some((m: any) => m.id.toString() === params.id));
                    }

                    if (favRes.ok) {
                        const fav = await favRes.json();
                        setIsFavorited(fav.some((m: any) => m.id.toString() === params.id));
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchSeries();
    }, [params.id]);

    const toggleBookmark = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        try {
            if (isBookmarked) {
                const res = await fetch(`http://localhost:4000/api/watchlist/${params.id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) setIsBookmarked(false);
            } else {
                const res = await fetch(`http://localhost:4000/api/watchlist`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ manga_id: params.id })
                });
                if (res.ok) setIsBookmarked(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const toggleFavorite = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        try {
            if (isFavorited) {
                const res = await fetch(`http://localhost:4000/api/favorites/${params.id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) setIsFavorited(false);
            } else {
                const res = await fetch(`http://localhost:4000/api/favorites`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ manga_id: params.id })
                });
                if (res.ok) setIsFavorited(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center font-black uppercase tracking-tighter text-4xl italic animate-pulse">Summoning...</div>;
    if (!series) return <div className="min-h-screen bg-background flex items-center justify-center font-black uppercase tracking-tighter text-4xl italic">Manga not found</div>;

    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={series.banner_url || series.cover_url}
                        className="w-full h-full object-cover blur-sm opacity-30 scale-110"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 h-full flex items-end pb-12 relative z-10">
                    <div className="flex flex-col md:flex-row gap-10 items-end">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 shrink-0"
                        >
                            <img
                                src={series.cover_url}
                                className="w-full h-full object-cover"
                                alt="Cover"
                            />
                        </motion.div>

                        <div className="flex-1 pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest">{series.status || 'Ongoing'}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic leading-none">
                                {series.title} <span className="text-primary italic">{series.title2}</span>
                            </h1>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <Star className="text-yellow-400 fill-yellow-400" size={18} />
                                    <span className="font-black text-xl">4.9</span>
                                </div>
                                <div className="h-4 w-px bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-primary" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Updated recently</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button className="px-10 py-4 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-3 transition-all hover:scale-105 active:scale-95">
                                    <Play size={20} fill="currentColor" />
                                    Read Latest
                                </button>
                                <button
                                    onClick={toggleBookmark}
                                    className={`w-14 h-14 glass flex items-center justify-center rounded-2xl transition-all ${isBookmarked ? 'bg-primary border-primary shadow-lg shadow-primary/30' : 'hover:bg-white/10'}`}
                                >
                                    <Bookmark size={24} className={isBookmarked ? 'fill-white' : ''} />
                                </button>
                                <button
                                    onClick={toggleFavorite}
                                    className={`w-14 h-14 glass flex items-center justify-center rounded-2xl transition-all ${isFavorited ? 'bg-red-500 border-red-500 shadow-lg shadow-red-500/30' : 'hover:bg-white/10'}`}
                                >
                                    <Heart size={24} className={isFavorited ? 'fill-white' : ''} />
                                </button>
                                <button className="w-14 h-14 glass flex items-center justify-center rounded-2xl hover:bg-white/10 transition-all">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left side: Info & Chapters */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4 italic">Synopsis</h2>
                            <p className="text-white/60 leading-relaxed text-lg font-medium italic">
                                In a world where light is forbidden, a young traveler discovers a long-forgotten power that could restore balance to the universe. Join Aris on an epic journey through the Shadow Realm, where every shadow hides a secret and every light is a beacon of hope or a trap for the unwary.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-8 border-b border-white/5 mb-8">
                            {["chapters", "reviews", "related"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t as any)}
                                    className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${tab === t ? "text-primary" : "text-white/30 hover:text-white"}`}
                                >
                                    {t}
                                    {tab === t && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="glass p-6 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <span className="text-white/20 font-black text-xl italic group-hover:text-primary transition-colors">#{10 - i}</span>
                                        <div>
                                            <p className="font-bold text-sm">Chapter {10 - i}: The Awakening</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mt-1">Oct 24, 2023</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-8 py-4 glass border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all">
                            Load More Chapters
                        </button>
                    </div>

                    {/* Right side: Meta Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="glass p-8 rounded-[2.5rem] border-white/5">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">Information</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Author</p>
                                    <p className="font-bold">Kim Sung-Ho</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Artist</p>
                                    <p className="font-bold">Studio Lunox</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Type</p>
                                    <p className="font-bold uppercase text-primary">Manhwa</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Views</p>
                                    <p className="font-bold uppercase">1,248,392</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[2.5rem] bg-primary/5 border-primary/20">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen size={20} className="text-primary" />
                                <h3 className="text-sm font-black uppercase tracking-widest italic">Staff Choice</h3>
                            </div>
                            <p className="text-sm text-white/60 italic leading-relaxed mb-6">"One of the best action series this year. The art style is simply breathtaking."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-xs uppercase">E</div>
                                <p className="text-xs font-bold uppercase tracking-widest">Editor Alex</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
