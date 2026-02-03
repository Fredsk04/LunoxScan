"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface MangaCardProps {
    id: string;
    title: string;
    cover: string;
    chapter?: string;
    rating?: number;
    genres?: string[];
}

export const MangaCard = ({ id, title, cover, chapter, rating, genres }: MangaCardProps) => {
    return (
        <Link href={`/series/${id}`} className="group relative block overflow-hidden rounded-xl bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.2)]">
            {/* Aspect Ratio Container for Cover */}
            <div className="aspect-[3/4] overflow-hidden">
                <img
                    src={cover}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay for chapter */}
                {chapter && (
                    <div className="absolute top-2 left-2 z-10 rounded-md bg-primary/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {chapter}
                    </div>
                )}
                {/* Rating overlay */}
                {rating && (
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        {rating}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="line-clamp-1 text-sm font-bold group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <div className="mt-1 flex flex-wrap gap-1">
                    {genres?.slice(0, 2).map((genre) => (
                        <span key={genre} className="text-[10px] text-muted-foreground uppercase tracking-widest">
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default MangaCard;
