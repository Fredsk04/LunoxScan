"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { User, Library, History, Settings, Camera, Clock, LogOut, Bookmark, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MangaCard from "@/components/MangaCard";

const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "watchlist", label: "Watchlist", icon: Bookmark },
    { id: "favorites", label: "Favorites", icon: Star },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"profile" | "watchlist" | "favorites" | "history" | "settings">("profile");
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [watchlist, setWatchlist] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/auth";
                return;
            }

            try {
                console.log("Fetching profile data with token:", token ? "Present" : "Missing");
                // Fetch User
                const userRes = await fetch("/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (userRes.ok) {
                    const data = await userRes.json();
                    console.log("User data fetched:", data);
                    setUser(data);
                } else {
                    console.error("User fetch failed:", userRes.status);
                    localStorage.removeItem("token");
                    window.location.href = "/auth";
                    return;
                }

                // Fetch Watchlist
                const wlRes = await fetch("/api/watchlist", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (wlRes.ok) {
                    const wlData = await wlRes.json();
                    console.log("Watchlist fetched:", wlData);
                    setWatchlist(wlData);
                } else {
                    console.error("Watchlist fetch failed:", wlRes.status);
                }

                // Fetch Favorites
                const favRes = await fetch("/api/favorites", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (favRes.ok) {
                    const favData = await favRes.json();
                    console.log("Favorites fetched:", favData);
                    setFavorites(favData);
                } else {
                    console.error("Favorites fetch failed:", favRes.status);
                }

                // Fetch History
                const histRes = await fetch("/api/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (histRes.ok) setHistory(await histRes.json());

            } catch (err) {
                console.error("Data fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        const token = localStorage.getItem("token");
        try {
            const res = await fetch("/api/profile/avatar", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                setUser({ ...user, avatar_url: data.avatar });
                window.dispatchEvent(new Event("profileUpdate"));
            }
        } catch (err) {
            console.error("Avatar upload error:", err);
        }
    };

    const handleUpdateProfile = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    bio: user.bio
                }),
            });
            if (res.ok) {
                window.dispatchEvent(new Event("profileUpdate"));
            }
        } catch (err) {
            console.error("Profile update error:", err);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure you want to delete your account? This action is irreversible.")) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch("/api/profile", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                localStorage.removeItem("token");
                window.location.href = "/auth";
            }
        } catch (err) {
            console.error("Delete account error:", err);
        }
    };

    if (loading) return (
        // ... (rest of the return block should be updated to use these handlers)
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="glass rounded-3xl p-8 sticky top-32">
                            <div className="relative w-32 h-32 mx-auto mb-6 group">
                                <div className="w-full h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                                    {user?.avatar_url ? (
                                        <img src={`${user.avatar_url}`} alt={user.username} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-4xl font-bold">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-2 right-2 p-2 bg-primary rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer">
                                    <Camera size={16} />
                                    <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
                                </label>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-xl font-bold mb-1">{user?.username}</h2>
                                <p className="text-sm text-white/50">{user?.email}</p>
                                {user?.role === 'admin' && (
                                    <div className="mt-3 flex justify-center">
                                        <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/30 flex items-center gap-1">
                                            <ShieldCheck size={12} />
                                            Administrator
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as "profile" | "watchlist" | "favorites" | "history" | "settings")}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === tab.id
                                            ? "bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                                            : "hover:bg-white/5 text-white/60 hover:text-white"
                                            }`}
                                    >
                                        <tab.icon size={20} />
                                        <span className="font-semibold">{tab.label}</span>
                                    </button>
                                ))}

                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        window.location.href = "/auth";
                                    }}
                                    className="flex items-center gap-4 px-6 py-4 rounded-2xl text-destructive hover:bg-destructive/10 transition-all mt-4"
                                >
                                    <LogOut size={20} />
                                    <span className="font-semibold">Logout</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === "profile" && (
                                    <section className="glass rounded-3xl p-10">
                                        <h3 className="text-2xl font-bold mb-8">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Username</label>
                                                <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-white/90">
                                                    {user?.username}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                                                <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-white/90">
                                                    {user?.email}
                                                </div>
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Bio</label>
                                                <textarea
                                                    value={user?.bio || ""}
                                                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                                    placeholder="Tell us about yourself..."
                                                    className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-white/90 h-32 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleUpdateProfile}
                                            className="mt-10 px-8 py-4 bg-primary rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg"
                                        >
                                            Save Changes
                                        </button>
                                    </section>
                                )}

                                {activeTab === "watchlist" && (
                                    <section>
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-2xl font-bold">Your Watchlist</h3>
                                            <span className="text-sm text-white/40 font-medium">{watchlist.length} Items</span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {Array.isArray(watchlist) && watchlist.map((item) => (
                                                <MangaCard
                                                    key={item.id}
                                                    id={item.id.toString()}
                                                    title={item.title}
                                                    cover={item.cover_url}
                                                    rating={4.8}
                                                />
                                            ))}
                                            {(!watchlist || watchlist.length === 0) && (
                                                <p className="col-span-full text-center py-20 text-white/20 font-bold italic uppercase tracking-widest underline decoration-primary/30">Your watchlist is empty</p>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {activeTab === "favorites" && (
                                    <section>
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-2xl font-bold">Your Favorites</h3>
                                            <span className="text-sm text-white/40 font-medium">{favorites.length} Items</span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {Array.isArray(favorites) && favorites.map((item) => (
                                                <MangaCard
                                                    key={item.id}
                                                    id={item.id.toString()}
                                                    title={item.title}
                                                    cover={item.cover_url}
                                                    rating={4.8}
                                                />
                                            ))}
                                            {(!favorites || favorites.length === 0) && (
                                                <p className="col-span-full text-center py-20 text-white/20 font-bold italic uppercase tracking-widest underline decoration-primary/30">Your favorites list is empty</p>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {activeTab === "history" && (
                                    <section>
                                        <h3 className="text-2xl font-bold mb-8">Reading History</h3>
                                        <div className="flex flex-col gap-4">
                                            {history.map((item) => (
                                                <Link href={`/series/${item.id}`} key={item.id} className="glass p-4 rounded-2xl flex items-center gap-6 hover:bg-white/5 transition-all group">
                                                    <div className="w-20 h-28 rounded-lg overflow-hidden shrink-0">
                                                        <img src={item.cover_url} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                                                        <p className="text-sm text-white/50 mb-3">Read Chapter {item.chapter_number} • {new Date(item.last_read_at).toLocaleDateString()}</p>
                                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="w-3/4 h-full bg-primary" />
                                                        </div>
                                                    </div>
                                                    <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
                                                        <Clock size={20} className="text-white/40" />
                                                    </button>
                                                </Link>
                                            ))}
                                            {history.length === 0 && (
                                                <p className="text-center py-20 text-white/20 font-bold italic uppercase tracking-widest underline decoration-primary/30">No reading history yet</p>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {activeTab === "settings" && (
                                    <section className="glass rounded-3xl p-10">
                                        <h3 className="text-2xl font-bold mb-8">Account Settings</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                                                <div>
                                                    <h4 className="font-bold mb-1">Email Notifications</h4>
                                                    <p className="text-sm text-white/40">Receive alerts for new chapters</p>
                                                </div>
                                                <div className="w-12 h-6 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                                                <div>
                                                    <h4 className="font-bold mb-1">Adult Content</h4>
                                                    <p className="text-sm text-white/40">Show 18+ content in results</p>
                                                </div>
                                                <div className="w-12 h-6 bg-white/10 rounded-full relative">
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" />
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleDeleteAccount}
                                                className="w-full py-4 px-6 border border-destructive/30 text-destructive rounded-2xl font-bold hover:bg-destructive/10 transition-all flex items-center justify-center gap-2"
                                            >
                                                <LogOut size={20} />
                                                Delete Account
                                            </button>
                                        </div>
                                    </section>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
