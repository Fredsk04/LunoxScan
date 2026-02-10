"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, Eye, DollarSign, Calendar } from "lucide-react";

export default function AnalyticsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("/api/admin/stats", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            <div className="container mx-auto px-6 py-20">
                <div className="mb-8">
                    <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4">
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">Analytics</h1>
                    <p className="text-white/40 mt-2">Platform performance metrics and insights</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="glass rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <Eye className="text-purple-400" size={32} />
                            <span className="text-xs font-black uppercase tracking-widest text-green-400 bg-green-400/10 px-2 py-1 rounded">Live</span>
                        </div>
                        <p className="text-3xl font-black mb-1">{stats?.totalViews?.toLocaleString() || 0}</p>
                        <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Total Views</p>
                    </div>

                    <div className="glass rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="text-blue-400" size={32} />
                            <span className="text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Active</span>
                        </div>
                        <p className="text-3xl font-black mb-1">{stats?.totalUsers?.toLocaleString() || 0}</p>
                        <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Total Users</p>
                    </div>

                    <div className="glass rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <TrendingUp className="text-yellow-400" size={32} />
                            <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Premium</span>
                        </div>
                        <p className="text-3xl font-black mb-1">{stats?.activeSubscribers?.toLocaleString() || 0}</p>
                        <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Subscribers</p>
                    </div>

                    <div className="glass rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <DollarSign className="text-green-400" size={32} />
                            <span className="text-xs font-black uppercase tracking-widest text-green-400 bg-green-400/10 px-2 py-1 rounded">Revenue</span>
                        </div>
                        <p className="text-3xl font-black mb-1">${stats?.totalRevenue?.toFixed(2) || "0.00"}</p>
                        <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Total Revenue</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass rounded-3xl p-10">
                        <h3 className="font-black uppercase tracking-tighter text-sm mb-6">Content Statistics</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <span className="text-white/60">Total Mangas</span>
                                <span className="font-black text-xl">{stats?.totalMangas || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <span className="text-white/60">Total Chapters</span>
                                <span className="font-black text-xl">{stats?.totalChapters || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <span className="text-white/60">Avg. Views per Manga</span>
                                <span className="font-black text-xl">
                                    {stats?.totalMangas > 0 ? Math.round(stats.totalViews / stats.totalMangas) : 0}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-10">
                        <h3 className="font-black uppercase tracking-tighter text-sm mb-6">User Engagement</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <span className="text-white/60">Free Users</span>
                                <span className="font-black text-xl">{(stats?.totalUsers - stats?.activeSubscribers) || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <span className="text-white/60">Premium Users</span>
                                <span className="font-black text-xl">{stats?.activeSubscribers || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <span className="text-white/60">Conversion Rate</span>
                                <span className="font-black text-xl">
                                    {stats?.totalUsers > 0 ? ((stats.activeSubscribers / stats.totalUsers) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
