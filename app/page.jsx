"use client";

import { useState } from "react";

export default function Page() {

  const [aiOpen, setAiOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">

        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-black text-blue-400">
            SUPELLEX
          </h1>

          <nav className="hidden md:flex gap-6 text-sm text-white/80">

            <a href="#kataloq" className="hover:text-blue-400">
              Kataloq
            </a>

            <a href="#aksesuar" className="hover:text-blue-400">
              Aksesuarlar
            </a>

            <a href="#videolar" className="hover:text-blue-400">
              Videolar
            </a>

            <a href="#kredit" className="hover:text-blue-400">
              Kredit
            </a>

            <a href="#rey" className="hover:text-blue-400">
              Rəylər
            </a>

            <a
              href="/muracietler"
              className="hover:text-cyan-400 text-cyan-300 font-bold"
            >
              Müraciətlər
            </a>

            <a href="#elaqe" className="hover:text-blue-400">
              Əlaqə
            </a>

          </nav>

        </div>

      </header>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-5 pt-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

        <div className="max-w-5xl text-center">

          <p className="inline-block px-5 py-2 rounded-full bg-white/10 text-blue-200 mb-5">
            Premium mebel və ağıllı satış sistemi
          </p>

          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
            SUPELLEX BAKU
          </h2>

          <p className="mt-6 text-xl text-white/70">
            Mətbəx mebeli, interyer dizayn, kredit, aksesuarlar və AI satış köməkçisi.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <a
              href="https://wa.me/994554131658"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-green-500 font-bold shadow-2xl"
            >
              WhatsApp
            </a>

            <a
              href="https://t.me/supellex_baku_bot"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-sky-500 font-bold shadow-2xl"
            >
              Telegram
            </a>

            <a
              href="/muracietler"
              className="px-8 py-4 rounded-2xl bg-purple-600 font-bold shadow-2xl"
            >
              Müraciətlər
            </a>

          </div>

        </div>

      </section>

      {/* CATALOG */}
      <section
        id="kataloq"
        className="px-5 py-24 bg-white text-slate-900"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <h2 className="text-4xl md:text-5xl font-black">
              Məhsul kataloqu
            </h2>

            <p className="mt-4 text-slate-600">
              Premium mebel layihələri
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Mətbəx mebeli",
              "Qonaq otağı",
              "Yataq otağı",
              "Aksesuarlar",
              "Ofis mebeli",
              "İkinci əl mebel",
            ].map((item) => (

              <div
                key={item}
                className="rounded-3xl bg-slate-100 overflow-hidden shadow-xl"
              >

                <div className="w-full h-64 bg-slate-300 flex items-center justify-center text-slate-500">
                  Şəkil yeri
                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-black">
                    {item}
                  </h3>

                  <p className="text-slate-600 mt-2">
                    Qiymət razılaşma ilə
                  </p>

                  <a
                    href="https://wa.me/994554131658"
                    target="_blank"
                    className="inline-block mt-5 px-5 py-3 rounded-xl bg-green-500 text-white font-bold"
                  >
                    Sifariş et
                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ACCESSORIES */}
      <section
        id="aksesuar"
        className="max-w-7xl mx-auto px-5 py-24"
      >

        <div className="text-center">

          <h2 className="text-4xl md:text-5xl font-black">
            Aksesuarlar
          </h2>

        </div>

        <div className="grid md:grid-cols-4 gap-5 mt-10">

          {[
            "Tutacaqlar",
            "Mexanizmlər",
            "MDF",
            "Rəng seçimi",
          ].map((x) => (

            <div
              key={x}
              className="p-6 rounded-3xl bg-white/10 border border-white/10 text-center"
            >

              <h3 className="text-xl font-black text-blue-300">
                {x}
              </h3>

            </div>

          ))}

        </div>

      </section>

      {/* VIDEOS */}
      <section
        id="videolar"
        className="px-5 py-24 bg-slate-900"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <h2 className="text-4xl md:text-5xl font-black">
              Video işlərimiz
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[1, 2].map((v) => (

              <div
                key={v}
                className="rounded-3xl bg-white/10 p-5"
              >

                <div className="h-72 rounded-2xl bg-slate-800 flex items-center justify-center text-white/50">
                  Video yeri
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* REVIEWS */}
      <section
        id="rey"
        className="px-5 py-24 bg-white text-slate-900"
      >

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-black">
            Müştəri rəyləri
          </h2>

          <div className="mt-10 rounded-3xl bg-slate-100 p-8">

            <input
              className="w-full p-4 rounded-xl bg-white text-slate-900"
              placeholder="Adınız"
            />

            <textarea
              className="w-full mt-4 p-4 rounded-xl bg-white text-slate-900 h-32"
              placeholder="Rəyinizi yazın"
            ></textarea>

            <button className="mt-5 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold">
              Rəy göndər
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer
        id="elaqe"
        className="px-5 py-16 bg-slate-950 border-t border-white/10"
      >

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <div>

            <h3 className="text-2xl font-black text-blue-400">
              SUPELLEX BAKU
            </h3>

            <p className="text-white/60 mt-3">
              Müştəri məmnuniyyəti ön plandadır.
            </p>

          </div>

          <div>

            <h4 className="font-black">
              Əlaqə
            </h4>

            <p className="text-white/60 mt-2">
              WhatsApp: 055 413 16 58
            </p>

            <p className="text-white/60">
              Telegram: @supellex_baku_bot
            </p>

            <p className="text-white/60">
              Email: supellexbaku@gmail.com
            </p>

          </div>

          <div>

            <h4 className="font-black">
              İş saatı
            </h4>

            <p className="text-white/60 mt-2">
              09:00 - 19:00
            </p>

            <p className="text-white/60">
              Bakı, Azərbaycan
            </p>

          </div>

        </div>

      </footer>

      {/* FLOAT BUTTONS */}
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">

        <a
          href="https://wa.me/994554131658"
          target="_blank"
          className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-2xl text-2xl"
        >
          ☎
        </a>

        <a
          href="https://t.me/supellex_baku_bot"
          target="_blank"
          className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center shadow-2xl text-2xl"
        >
          ✈
        </a>

      </div>

      {/* AI BUTTON */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed left-5 bottom-5 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.6)]"
      >
        <AiPremiumIcon />
      </button>

      {/* AI PAGE */}
      {aiOpen && (

        <div className="fixed inset-0 z-[998] bg-slate-950 text-white p-5 overflow-auto">

          <button
            onClick={() => setAiOpen(false)}
            className="fixed top-5 right-5 text-4xl"
          >
            ×
          </button>

          <div className="max-w-4xl mx-auto pt-20">

            <h2 className="text-5xl font-black text-blue-400">
              Supellex AI
            </h2>

            <div className="mt-8 bg-white text-slate-900 rounded-3xl p-6">

              <div className="bg-slate-100 rounded-2xl p-4">
                Salam 👋 Sizə necə kömək edə bilərəm?
              </div>

              <textarea
                className="w-full mt-5 border p-4 rounded-2xl h-32"
                placeholder="Mesajınızı yazın..."
              ></textarea>

              <button className="mt-4 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
                AI-yə göndər
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
