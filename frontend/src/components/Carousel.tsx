"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/mangas");
        if (!res.ok) throw new Error("Erreur API");
        const data = await res.json();
        setMangas(data);
      } catch (error) {
        console.error("Erreur lors du chargement des mangas :", error);
      }
    };

    fetchMangas();
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-full"
      >
        {mangas.map((manga) => (
          <SwiperSlide key={manga.id}>
            <div className="relative w-full h-full">
              <img
                src={manga.banner_url}
                alt={manga.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white w-full">
                <h2 className="text-2xl md:text-4xl font-bold">{manga.title}</h2>
                <p className="text-sm md:text-base line-clamp-2">{manga.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
