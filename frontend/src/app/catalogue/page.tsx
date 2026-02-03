"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MangaCard from "@/components/MangaCard";
import { Search, Filter, ChevronDown, BookOpen, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

const MANGA_GENRES = ["All", "Action", "Romance", "Fantasy", "Sci-Fi", "Comedy", "Drama", "Slice of Life"];
const NOVEL_GENRES = ["All", "Light Novels", "Web Novels", "Wuxia", "Xianxia", "Historical", "Isekai"];

export default function CataloguePage() {
    const searchParams = useSearchParams();
    const [type, setType] = useState<"manga" | "novel">("manga");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [mangas, setMangas] = useState<any[]>([]);
    const [genres, setGenres] = useState<string[]>(["All"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/genres");
                if (res.ok) {
                    const data = await res.json();
                    setGenres(["All", ...data.map((g: any) => g.name)]);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const q = searchParams.get("q");
        if (q !== null) setSearchQuery(q);
    }, [searchParams]);

    useEffect(() => {
        const fetchCatalogue = async () => {
            setLoading(true);
            try {
                const url = searchQuery
                    ? `http://localhost:4000/api/mangas/search?q=${searchQuery}`
                    : `http://localhost:4000/api/mangas`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setMangas(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogue();
    }, [searchQuery]);

    const filteredMangas = mangas.filter(m => {
        if (activeCategory === "All") return true;
        // In a real app we'd have genres in the DB and check them here
        return true;
    });

    const currentGenres = genres;

    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Discovery Engine
                            </div>
                        </div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter italic">
                            The <span className="text-primary">Catalogue</span>
                        </h1>
                        <p className="text-white/40 max-w-xl mt-4 font-medium italic">
                            Explore thousands of stories across dimensions. Switch between visual masterpieces and deep narratives.
                        </p>
                    </div>

                    {/* Switcher */}
                    <div className="p-1 glass rounded-2xl flex items-center self-start">
                        <button
                            onClick={() => { setType("manga"); setActiveCategory("All"); }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === "manga" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"}`}
                        >
                            <Layers size={16} />
                            Manga
                        </button>
                        <button
                            onClick={() => { setType("novel"); setActiveCategory("All"); }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === "novel" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"}`}
                        >
                            <BookOpen size={16} />
                            Novels
                        </button>
                    </div>
                </header>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 w-full md:w-auto no-scrollbar">
                        {currentGenres.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all text-[11px] font-bold uppercase tracking-widest ${activeCategory === cat
                                    ? "bg-white text-black shadow-white/10"
                                    : "glass text-white/40 hover:text-white border-white/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={`Search ${type}s...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Stats & Sort */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20 italic">
                        Displaying {filteredMangas.length} {type === "manga" ? "Visual Chapters" : "Literary Volumes"}
                    </p>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                        Sort: Most Relevant <ChevronDown size={14} />
                    </button>
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={type + searchQuery}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                    >
                        {filteredMangas.map((manga) => (
                            <MangaCard
                                key={manga.id}
                                id={manga.id.toString()}
                                title={manga.title}
                                cover={manga.cover_url}
                                rating={4.5}
                            />
                        ))}
                        {filteredMangas.length === 0 && !loading && (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-white/20 font-black uppercase tracking-widest italic text-2xl">No results found in the Abyss</p>
                            </div>
                        )}
                        {loading && (
                            <div className="col-span-full py-20 text-center animate-pulse">
                                <p className="text-primary font-black uppercase tracking-widest italic text-2xl">Summoning content...</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                <div className="mt-20 flex justify-center items-center gap-2">
                    <button className="px-6 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[10px] italic text-white/40">Prev</button>
                    <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black shadow-lg">1</button>
                    <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all font-black text-white/40">2</button>
                    <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all font-black text-white/40">3</button>
                    <button className="px-6 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[10px] italic">Next</button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
