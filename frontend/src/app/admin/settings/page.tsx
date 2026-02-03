"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "LunoxScan",
        siteDescription: "Your premium manga and novel reading platform",
        maintenanceMode: false,
        registrationEnabled: true,
        premiumOnly: false,
    });

    const handleSave = async () => {
        // Placeholder for saving settings
        console.log("Settings saved:", settings);
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4">
                            <ArrowLeft size={20} />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Site Settings</h1>
                        <p className="text-white/40 mt-2">Configure your platform settings</p>
                    </div>

                    <div className="space-y-6">
                        <div className="glass rounded-3xl p-8">
                            <h3 className="font-black uppercase tracking-tighter text-sm mb-6">General Settings</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Site Name</label>
                                    <input
                                        type="text"
                                        value={settings.siteName}
                                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Site Description</label>
                                    <textarea
                                        value={settings.siteDescription}
                                        onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 h-24"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-3xl p-8">
                            <h3 className="font-black uppercase tracking-tighter text-sm mb-6">Access Control</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="font-bold">Maintenance Mode</p>
                                        <p className="text-xs text-white/40 mt-1">Disable site access for maintenance</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.maintenanceMode}
                                            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="font-bold">User Registration</p>
                                        <p className="text-xs text-white/40 mt-1">Allow new users to register</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.registrationEnabled}
                                            onChange={(e) => setSettings({ ...settings, registrationEnabled: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="font-bold">Premium Only Mode</p>
                                        <p className="text-xs text-white/40 mt-1">Restrict content to premium users only</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.premiumOnly}
                                            onChange={(e) => setSettings({ ...settings, premiumOnly: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full px-8 py-4 bg-primary rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
