"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, Users, Trophy, Ghost } from "lucide-react";
import { motion } from "framer-motion";

const FORUMS = [
    { title: "General Discussion", posts: "128k", icon: MessageSquare, color: "bg-blue-500/20 text-blue-400" },
    { title: "Manga Suggestions", posts: "45k", icon: Users, color: "bg-green-500/20 text-green-400" },
    { title: "Competitions", posts: "8k", icon: Trophy, color: "bg-yellow-500/20 text-yellow-400" },
    { title: "Staff Corner", posts: "2k", icon: Ghost, color: "bg-purple-500/20 text-purple-400" },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <header className="mb-12">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-4">
                        Lunox <span className="text-primary italic">Community</span>
                    </h1>
                    <p className="text-white/40 font-medium">Join the largest gathering of scanlation enthusiasts in the multiverse.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {FORUMS.map((forum, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={forum.title}
                                className="glass p-8 rounded-[2rem] flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${forum.color}`}>
                                        <forum.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{forum.title}</h3>
                                        <p className="text-sm text-white/40 font-bold uppercase tracking-widest mt-1">{forum.posts} Conversations</p>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                                    <MessageSquare size={16} className="group-hover:text-primary" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <aside className="space-y-8">
                        <div className="glass p-8 rounded-[2.5rem] border-primary/20 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
                            <h4 className="text-lg font-black uppercase italic mb-6 tracking-tighter">Active <span className="text-primary italic">Collaborators</span></h4>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary">A</div>
                                        <div>
                                            <p className="text-xs font-bold">User_Explorer_{i}</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest italic">Legendary Scanter</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 bg-primary rounded-xl text-xs font-black uppercase tracking-widest italic shadow-lg">Join Discord</button>
                        </div>

                        <div className="glass p-8 rounded-[2.5rem]">
                            <h4 className="text-lg font-black uppercase italic mb-6 tracking-tighter">Top <span className="text-primary italic">Donators</span></h4>
                            <div className="flex flex-col gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-white/60">#0{i} StarMember</span>
                                        <span className="text-xs font-black text-primary">$499.00</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
