"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";

export default function AddMangaPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        title2: "",
        description: "",
        author: "",
        artist: "",
        status: "ongoing",
        type: "manga",
        cover_url: "",
        banner_url: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("/api/admin/manga", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">Add New Manga</h1>
                    <p className="text-white/40 mb-12">Create a new manga entry in the database</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Alternative Title</label>
                                <input
                                    type="text"
                                    value={formData.title2}
                                    onChange={(e) => setFormData({ ...formData, title2: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Description</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 h-32"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Artist</label>
                                <input
                                    type="text"
                                    value={formData.artist}
                                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                >
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="hiatus">Hiatus</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                >
                                    <option value="manga">Manga</option>
                                    <option value="manhwa">Manhwa</option>
                                    <option value="manhua">Manhua</option>
                                    <option value="novel">Novel</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Cover URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.cover_url}
                                    onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Banner URL</label>
                                <input
                                    type="url"
                                    value={formData.banner_url}
                                    onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                type="submit"
                                className="px-8 py-4 bg-primary rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all"
                            >
                                Create Manga
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
