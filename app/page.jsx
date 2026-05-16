"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [qalereya, setQalereya] = useState([]);

  useEffect(() => {
    const qalereya = [
  {
    id: 1,
    sekil:
      "https://res.cloudinary.com/dvjkyyk9z/image/upload/v1747420000/20250516_181657_chat8b.jpg",
    ad: "Modern Divan",
  },
];

<section className="py-16">
  <h2 className="text-4xl font-bold mb-10">Qalereya</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {qalereya.map((item) => (
      <div
        key={item.id}
        className="bg-zinc-900 rounded-2xl overflow-hidden"
      >
        <img
          src={item.sekil}
          alt={item.ad}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">
          <h3 className="text-xl font-semibold">{item.ad}</h3>
        </div>
      </div>
    ))}
  </div>
</section>

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="p-6 md:p-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Supellex Baku
        </h1>

        <p className="text-neutral-300 mb-6">
          Mebel, aksesuar və xüsusi sifarişlər
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/994554131658"
            className="bg-green-600 px-5 py-3 rounded-xl"
          >
            WhatsApp
          </a>

          <a
            href="https://t.me/supellex_baku_bot"
            className="bg-blue-600 px-5 py-3 rounded-xl"
          >
            Telegram
          </a>

          <Link
            href="/muracietler"
            className="bg-white text-black px-5 py-3 rounded-xl"
          >
            Müraciətlər
          </Link>

          <Link
            href="/admin"
            className="border border-white px-5 py-3 rounded-xl"
          >
            Admin
          </Link>
        </div>
      </section>

      <section className="p-6 md:p-12">
        <h2 className="text-3xl font-bold mb-6">Qalereya</h2>

        {qalereya.length === 0 ? (
          <p className="text-neutral-400">
            Hələ şəkil əlavə edilməyib.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {qalereya.map((item, i) => (
              <div
                key={i}
                className="bg-neutral-900 rounded-2xl overflow-hidden shadow"
              >
                <img
                  src={item.link}
                  alt={item.ad || "Supellex mebel"}
                  className="w-full h-72 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">
                    {item.ad || "Supellex məhsulu"}
                  </h3>

                  <p className="text-neutral-400 text-sm">
                    {item.kateqoriya || "Qalereya"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
