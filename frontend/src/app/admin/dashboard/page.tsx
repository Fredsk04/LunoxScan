"use client";

import {
    LayoutDashboard, Library, Upload, BookText, BarChart3, Users, Settings,
    Search, Bell, Plus, Eye, UserCheck, Bookmark, DollarSign,
    MoreVertical, Edit3, Trash2, Calendar, LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const SIDEBAR_LINKS = [
    { label: "Dashboard", icon: LayoutDashboard, active: true, href: "/admin/dashboard" },
    { label: "Add New Manga", icon: Library, href: "/admin/manga/new" },
    { label: "Manage Users", icon: Users, href: "/admin/users" },
    { label: "User Analytics", icon: BarChart3, href: "/admin/analytics" },
    { label: "Site Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [genres, setGenres] = useState<any[]>([]);
    const [newGenre, setNewGenre] = useState("");

    const fetchGenres = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/genres");
            if (res.ok) {
                const data = await res.json();
                setGenres(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        const fetchStats = async () => {
            try {
                const [statsRes, userRes] = await Promise.all([
                    fetch("http://localhost:4000/api/admin/stats", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch("http://localhost:4000/api/auth/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                if (statsRes.ok && userRes.ok) {
                    const statsData = await statsRes.json();
                    const userData = await userRes.json();
                    setData(statsData);
                    setUser(userData);
                } else {
                    // If not admin, ProtectedWrapper should have caught it, but double check
                    window.location.href = "/";
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        fetchGenres();
    }, []);

    const handleAddGenre = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGenre) return;
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:4000/api/genres", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: newGenre }),
            });
            if (res.ok) {
                setNewGenre("");
                fetchGenres();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteGenre = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:4000/api/genres/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchGenres();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/auth";
    };

    if (loading) return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const STATS_CARDS = [
        { label: "Total Page Views", value: data?.stats?.totalViews?.toLocaleString() || "0", trend: "+0%", icon: Eye, color: "text-purple-400" },
        { label: "Total Users", value: data?.stats?.totalUsers?.toLocaleString() || "0", trend: "+new", icon: UserCheck, color: "text-green-400" },
        { label: "Active Subscribers", value: data?.stats?.activeSubscribers?.toLocaleString() || "0", trend: "Premium", icon: Bookmark, color: "text-red-400" },
        { label: "Total Revenue", value: `$${data?.stats?.totalRevenue?.toFixed(2) || "0.00"}`, trend: "Live", icon: DollarSign, color: "text-blue-400" },
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex">

            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-[#0c0c0e] flex flex-col shrink-0">
                <div className="p-8 border-b border-white/5 mb-8 flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/img/lunoxscan_site_logo.png" alt="Logo" className="h-8 w-auto" />
                    </Link>
                </div>

                <nav className="flex-1 px-4 flex flex-col gap-1">
                    <p className="px-4 text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Main Menu</p>
                    {SIDEBAR_LINKS.map(link => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-sm transition-all group ${link.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <link.icon size={20} className={link.active ? "text-white" : "text-white/20 group-hover:text-primary transition-colors"} />
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 mt-auto">
                    <div className="p-4 glass rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold uppercase">
                                {user?.username?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-bold truncate max-w-[80px]">{user?.username}</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin</p>
                            </div>
                        </div>
                        <button onClick={logout} className="text-white/40 hover:text-destructive transition-colors">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 shrink-0">
                    <div className="relative w-96 font-medium">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            placeholder="Search mangas, users, or reports..."
                            className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all">
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full" />
                        </button>
                        <Link href="/admin/manga/new" className="px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                            <Plus size={16} strokeWidth={3} />
                            Create New
                        </Link>
                    </div>
                </header>

                {/* Board */}
                <div className="flex-1 overflow-y-auto p-10">

                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">Admin Dashboard</h1>
                            <p className="text-white/40 text-sm italic">Monitor your platform performance and manage recent content uploads.</p>
                        </div>
                        <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl text-xs font-bold text-white/40">
                            <Calendar size={16} />
                            {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {STATS_CARDS.map(stat => (
                            <div key={stat.label} className="p-8 glass rounded-3xl group hover:bg-primary/5 transition-all cursor-default border-white/5">
                                <div className="flex items-center justify-between mb-8 text-white/40 group-hover:text-white transition-colors">
                                    <stat.icon size={24} className={stat.color} />
                                    <span className={`text-[10px] font-black rounded-lg px-2 py-1 ${stat.trend.startsWith('+') ? "text-green-400 bg-green-400/10" : "text-primary bg-primary/10"}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1 group-hover:text-primary transition-colors">{stat.label}</p>
                                    <p className="text-3xl font-black tracking-tight uppercase">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                        {/* Recent Users */}
                        <div className="glass rounded-[2.5rem] p-10 flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black uppercase tracking-tighter text-sm">Newest Explorers</h3>
                                <Link href="/admin/users" className="text-[10px] uppercase font-bold text-primary hover:text-white transition-colors">Manage Users</Link>
                            </div>
                            <div className="flex flex-col gap-4">
                                {data?.recentUsers?.map((u: any) => (
                                    <div key={u.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                {u.username.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{u.username}</p>
                                                <p className="text-[10px] text-white/30 truncate max-w-[150px]">{u.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                                {new Date(u.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Chapters */}
                        <div className="glass rounded-[2.5rem] p-10 flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black uppercase tracking-tighter text-sm">Latest Uploads</h3>
                                <Link href="/catalogue" className="text-[10px] uppercase font-bold text-primary hover:text-white transition-colors">Library</Link>
                            </div>
                            <div className="flex flex-col gap-4">
                                {data?.recentChapters?.map((c: any) => (
                                    <div key={c.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                                                <BookText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold group-hover:text-primary transition-colors truncate max-w-[200px]">{c.manga_title}</p>
                                                <p className="text-[10px] text-white/30 uppercase tracking-widest italic">Chapter {c.number}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-2 py-1 bg-green-400/10 text-green-400 text-[8px] font-black uppercase tracking-widest rounded">LIVE</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                        {/* Genre Management */}
                        <div className="glass rounded-[2.5rem] p-10 flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black uppercase tracking-tighter text-sm">Genre Management</h3>
                                <Plus size={16} className="text-primary" />
                            </div>
                            <form onSubmit={handleAddGenre} className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    placeholder="New Genre Name..."
                                    value={newGenre}
                                    onChange={(e) => setNewGenre(e.target.value)}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
                                />
                                <button type="submit" className="px-4 py-2 bg-primary rounded-xl text-xs font-bold uppercase tracking-widest">Add</button>
                            </form>
                            <div className="flex flex-wrap gap-2">
                                {genres.map(g => (
                                    <div key={g.id} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-xs font-bold group">
                                        <span>{g.name}</span>
                                        <button onClick={() => handleDeleteGenre(g.id)} className="text-white/20 hover:text-destructive transition-colors">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center min-h-[300px] text-center">
                            <BarChart3 size={48} className="text-white/10 mb-6" />
                            <h2 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">Detailed Analytics Integration</h2>
                            <p className="text-white/40 text-sm max-w-md">The system is gathering more data to generate advanced traffic and retention charts. Check back in 24 hours.</p>
                            <button className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">System Status</button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
