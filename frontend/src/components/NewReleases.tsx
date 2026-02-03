"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MangaCard from "./MangaCard";

export const NewReleases = () => {
    const [mangas, setMangas] = useState<any[]>([]);

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/mangas");
                if (res.ok) {
                    const data = await res.json();
                    // Get the 6 most recent mangas
                    setMangas(data.slice(0, 6));
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchNewReleases();
    }, []);

    return (
        <section className="py-12">
            <div className="container mx-auto px-6">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter">
                            New Releases
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground italic">
                            Fresh chapters updated daily
                        </p>
                    </div>
                    <Link
                        href="/catalogue"
                        className="group flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg"
                    >
                        View All
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
                    {mangas.map((manga) => (
                        <MangaCard
                            key={manga.id}
                            id={manga.id.toString()}
                            title={manga.title}
                            cover={manga.cover_url}
                            rating={4.5}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewReleases;
