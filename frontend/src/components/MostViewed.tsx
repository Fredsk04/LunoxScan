"use client";

import { useState, useEffect } from "react";
import { Eye, Star } from "lucide-react";
import Link from "next/link";

const MOST_VIEWED = [
    {
        id: "1",
        rank: "01",
        title: "Shadow Realm: The Lost Chronicles",
        cover: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=400&q=80",
        views: "1.3M",
        rating: 4.8,
        status: "Updated 2h ago"
    },
    {
        id: "2",
        rank: "02",
        title: "Beyond the Void Walker",
        cover: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?auto=format&fit=crop&w=400&q=80",
        views: "980K",
        rating: 4.7,
        status: "New Chapter Out"
    },
    {
        id: "3",
        rank: "03",
        title: "Neon Genesis Redemption",
        cover: "https://images.unsplash.com/photo-1578632738981-433069410efd?auto=format&fit=crop&w=400&q=80",
        views: "850K",
        rating: 4.6,
        status: "Ongoing"
    }
];

export const MostViewed = () => {
    const [activeTab, setActiveTab] = useState("manga");
    const [mostViewed, setMostViewed] = useState<any[]>([]);

    useEffect(() => {
        const fetchMostViewed = async () => {
            try {
                const res = await fetch("/api/mangas");
                if (res.ok) {
                    const data = await res.json();
                    // Sort by views descending and take top 3
                    const sorted = data.sort((a: any, b: any) => (b.views || 0) - (a.views || 0)).slice(0, 3);
                    setMostViewed(sorted);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchMostViewed();
    }, []);

    return (
        <section className="py-12 bg-card/20 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter">
                            Most Viewed <span className="text-primary">this week</span>
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground italic">
                            Trending titles from our growing library
                        </p>
                    </div>

                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 w-fit">
                        <button
                            onClick={() => setActiveTab("manga")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "manga" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/50 hover:text-white"
                                }`}
                        >
                            Manga
                        </button>
                        <button
                            onClick={() => setActiveTab("novels")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "novels" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/50 hover:text-white"
                                }`}
                        >
                            Novels
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mostViewed.map((item, index) => (
                        <Link key={item.id} href={`/series/${item.id}`} className="relative group flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300">
                            {/* Rank Number Background */}
                            <div className="absolute -left-4 -top-4 text-8xl font-black text-white/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors">
                                0{index + 1}
                            </div>

                            {/* Cover Image */}
                            <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 border-primary/20">
                                <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs text-secondary-foreground font-medium">
                                        <Eye size={12} className="text-primary" />
                                        {(item.views || 0).toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-secondary-foreground font-medium">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        4.8
                                    </span>
                                </div>
                                <span className="mt-1 text-[10px] uppercase font-bold tracking-wider text-primary">
                                    {item.status || "Ongoing"}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MostViewed;
