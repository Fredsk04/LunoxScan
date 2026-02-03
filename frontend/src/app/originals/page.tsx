"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MangaCard from "@/components/MangaCard";
import { Search, Sparkles } from "lucide-react";

export default function OriginalsPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <header className="mb-20 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 blur-[100px] rounded-full -z-10" />
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-6">
                        <Sparkles size={14} />
                        Lunox Exclusive
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
                        Originals <span className="text-primary italic">Catalogue</span>
                    </h1>
                    <p className="text-white/50 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Hand-picked and officially licensed webtoons and novels that you can only find right here.
                    </p>
                </header>

                <div className="flex justify-center mb-16">
                    <div className="relative w-full md:w-[600px] group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search originals..."
                            className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-lg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 1, 2, 3, 4].map((i, idx) => (
                        <MangaCard
                            key={idx}
                            id={`orig-${idx}`}
                            title={`Original series ${idx + 1}`}
                            cover={`https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=500&q=80`}
                            chapter={`CH. ${idx + 10}`}
                            rating={5.0}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
