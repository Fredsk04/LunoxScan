"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                            }}
                            className="mb-8"
                        >
                            <img
                                src="/img/lunoxscan_site_logo.png"
                                alt="LunoxScan Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </motion.div>

                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ left: "-100%" }}
                                animate={{ left: "100%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute top-0 bottom-0 w-1/2 bg-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-[10px] uppercase font-black tracking-[0.3em] text-white/40 italic"
                        >
                            Designed for Darkness
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
