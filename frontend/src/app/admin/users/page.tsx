"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users as UsersIcon, Shield, Trash2, Edit } from "lucide-react";

export default function UsersManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:4000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:4000/api/admin/users/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) {
                fetchUsers();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:4000/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                fetchUsers();
            }
        } catch (e) {
            console.error(e);
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
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">User Management</h1>
                    <p className="text-white/40 mt-2">Manage user roles and permissions</p>
                </div>

                <div className="glass rounded-3xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white/40">User</th>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white/40">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white/40">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white/40">Subscription</th>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white/40">Joined</th>
                                <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-widest text-white/40">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-bold">{user.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/60">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase"
                                        >
                                            <option value="user">User</option>
                                            <option value="staff">Staff</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.subscription === 'mythic' ? 'bg-purple-500/20 text-purple-400' :
                                                user.subscription === 'legende' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    user.subscription === 'epique' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-white/10 text-white/40'
                                            }`}>
                                            {user.subscription}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/40 text-sm">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
