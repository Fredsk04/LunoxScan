"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, Crown, Zap, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
    {
        name: "Free",
        price: "0",
        features: ["Access to standard library", "Regular updates", "Ads supported", "Community access"],
        icon: Zap,
        color: "white/10"
    },
    {
        name: "Epique",
        price: "4.99",
        features: ["Early access to new chapters", "No advertisements", "Exclusive badges", "HD content scans"],
        icon: Crown,
        color: "primary",
        popular: true
    },
    {
        name: "Legende",
        price: "9.99",
        features: ["Everything in Epique", "Offline reading downloads", "Special Discord role", "Request series priority"],
        icon: Shield,
        color: "white/20"
    },
    {
        name: "Mythic",
        price: "19.99",
        features: ["Everything in Legende", "Custom site themes", "Direct support from devs", "Early beta features"],
        icon: Heart,
        color: "white/30"
    }
];

export default function PremiumPage() {
    const handleSubscribe = async (plan: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        if (plan === "Free") {
            return;
        }

        // Simulation de paiement
        try {
            const res = await fetch("/api/subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ plan: plan.toLowerCase() }),
            });
            if (res.ok) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <header className="text-center mb-20">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-4 bg-primary/20 rounded-2xl mb-6 shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                    >
                        <Crown size={48} className="text-primary" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic">
                        Unlock <span className="text-primary">Premium</span> Content
                    </h1>
                    <p className="text-white/40 max-w-2xl mx-auto italic font-bold uppercase tracking-widest text-xs">
                        Support your favorite scanlation team and get exclusive benefits.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {PLANS.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`glass p-10 rounded-[32px] flex flex-col relative overflow-hidden ${plan.popular ? "border-primary/50 shadow-[0_0_40px_rgba(124,58,237,0.2)] scale-105" : ""
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-3 rounded-xl ${plan.popular ? "bg-primary/20 text-primary" : "bg-white/5 text-white/40"}`}>
                                    <plan.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black">${plan.price}</span>
                                        <span className="text-white/30 text-xs font-bold">/mo</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                                        <div className="mt-1 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <Check size={10} className="text-primary font-bold" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSubscribe(plan.name)}
                                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] italic transition-all ${plan.popular ? "bg-primary text-white shadow-lg lg:hover:scale-105" : "bg-white/5 hover:bg-white/10"
                                    }`}>
                                {plan.name === "Free" ? "Current Plan" : "Subscribe Now"}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <section className="mt-32 glass p-12 rounded-[40px] text-center max-w-4xl mx-auto relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
                    <h2 className="text-3xl font-black uppercase mb-4 italic">Corporate & Large Team Plans</h2>
                    <p className="text-white/50 mb-8 max-w-xl mx-auto">Are you a scanlation group looking to host your content on LunoxScan? We offer specialized infrastructure for teams.</p>
                    <button className="px-10 py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all uppercase text-xs tracking-widest italic">Contact Partnerships</button>
                </section>
            </main>

            <Footer />
        </div>
    );
}
