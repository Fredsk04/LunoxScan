"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Ghost, Heart, Sword, Rocket, Search } from "lucide-react";
import MangaCard from "./MangaCard";

const GENRES = [
    { name: "Action", icon: Sword, color: "text-red-400" },
    { name: "Romance", icon: Heart, color: "text-pink-400" },
    { name: "Fantasy", icon: Zap, color: "text-yellow-400" },
    { name: "Sci-Fi", icon: Rocket, color: "text-blue-400" },
    { name: "Horror", icon: Ghost, color: "text-purple-400" },
];

export const DiscoverySection = () => {
    const [phase, setPhase] = useState<"idle" | "animating" | "result">("idle");
    const [particles, setParticles] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await fetch("http://localhost:4000/api/auth/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    }
                } catch (e) {
                    console.error("DiscoverySection fetch error", e);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/mangas");
            if (res.ok) {
                const data = await res.json();
                // Get 5 random mangas
                const shuffled = data.sort(() => 0.5 - Math.random());
                setRecommendations(shuffled.slice(0, 5));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const startDiscovery = () => {
        setPhase("animating");
        // Generate initial particles
        const newParticles = GENRES.map((g, i) => ({
            ...g,
            id: i,
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
        }));
        setParticles(newParticles);

        // Fetch recommendations
        fetchRecommendations();

        // After animation, show result
        setTimeout(() => {
            setPhase("result");
        }, 4000);
    };

    if (loading || !user) return null;

    return (
        <section className="py-24 bg-background relative overflow-hidden min-h-[800px] flex flex-col items-center justify-center">
            <div className="container mx-auto px-6 relative z-10 text-center">

                <AnimatePresence mode="wait">
                    {phase === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic leading-none">
                                Not sure what to <span className="text-primary">Read?</span>
                            </h2>
                            <p className="text-white/50 text-xl mb-12 italic font-medium">
                                Let the Lunox Abyss decide your next destiny. One click, infinite worlds.
                            </p>
                            <button
                                onClick={startDiscovery}
                                className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Sparkles size={24} className="group-hover:animate-pulse" />
                                    Summon Recommendations
                                </span>
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </motion.div>
                    )}

                    {phase === "animating" && (
                        <motion.div
                            key="animating"
                            className="relative w-full h-[500px] flex items-center justify-center"
                        >
                            {/* Black Hole Core */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1], rotate: 720 }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                                className="w-48 h-48 bg-black rounded-full border-4 border-primary shadow-[0_0_100px_rgba(124,58,237,0.8)] relative z-20"
                            >
                                <div className="absolute inset-x-0 inset-y-0 rounded-full border-t-4 border-white/50 animate-spin" />
                            </motion.div>

                            {/* Accretion Disk */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute w-96 h-96 border-[1px] border-primary/20 rounded-full blur-sm"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[500px] h-[500px] border-[1px] border-white/10 rounded-full blur-xs"
                            />

                            {/* Genres being sucked in */}
                            {particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
                                    animate={{
                                        x: 0,
                                        y: 0,
                                        opacity: [1, 1, 0],
                                        scale: [1, 1.5, 0],
                                        rotate: 360
                                    }}
                                    transition={{ duration: 2, delay: p.id * 0.2, ease: "backIn" }}
                                    className={`absolute z-30 flex items-center gap-2 glass px-4 py-2 rounded-full ${p.color}`}
                                >
                                    <p.icon size={16} />
                                    <span className="font-bold text-xs uppercase tracking-widest">{p.name}</span>
                                </motion.div>
                            ))}

                            {/* Final Flash Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0, 1, 0] }}
                                transition={{ duration: 4, times: [0, 0.8, 0.9, 1] }}
                                className="fixed inset-0 bg-white z-[100] pointer-events-none"
                            />
                        </motion.div>
                    )}

                    {phase === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full"
                        >
                            <div className="flex flex-col items-center mb-12">
                                <div className="px-6 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
                                    Fate has Chosen
                                </div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Your <span className="text-primary italic">Eclipse</span> Suggestions</h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {recommendations.map((item: any, idx: number) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: idx * 0.15 }}
                                    >
                                        <MangaCard
                                            id={item.id.toString()}
                                            title={item.title}
                                            cover={item.cover_url}
                                            rating={4.8}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                onClick={() => setPhase("idle")}
                                className="mt-16 text-white/40 hover:text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-1 transition-all"
                            >
                                Summon Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Ambience */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${phase === 'animating' ? 'opacity-100' : 'opacity-20'}`}>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,transparent_70%)]" />
            </div>
        </section>
    );
};

export default DiscoverySection;
