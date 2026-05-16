"use client";

import { useState } from "react";

const products = [
  {
    title: "Mətbəx mebeli",
    category: "Mətbəx",
    price: "Qiymət razılaşma ilə",
    image: "/products/metbex-1.jpg",
  },
  {
    title: "Qonaq otağı mebeli",
    category: "Qonaq otağı",
    price: "Qiymət razılaşma ilə",
    image: "/products/qonaq-1.jpg",
  },
  {
    title: "Yataq otağı mebeli",
    category: "Yataq otağı",
    price: "Qiymət razılaşma ilə",
    image: "/products/yataq-1.jpg",
  },
];

const videos = [
  {
    title: "Mətbəx layihəsi",
    video: "/videos/metbex-video-1.mp4",
  },
  {
    title: "Hazır mebel işi",
    video: "/videos/mebel-video-1.mp4",
  },
];

export default function Page() {
  const [chatOpen, setChatOpen] = useState(false);
  const [amount, setAmount] = useState(2000);
  const [months, setMonths] = useState(12);

  const monthly = Math.round(amount / months);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-blue-400">SUPELLEX</h1>

          <nav className="hidden md:flex gap-7 text-sm text-white/80">
            <a href="#xidmetler" className="hover:text-blue-400">Xidmətlər</a>
            <a href="#kataloq" className="hover:text-blue-400">Kataloq</a>
            <a href="#videolar" className="hover:text-blue-400">Videolar</a>
            <a href="#kredit" className="hover:text-blue-400">Kredit</a>
            <a href="#elaqe" className="hover:text-blue-400">Əlaqə</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-5 pt-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="mb-5 inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-blue-200 text-sm">
            Premium mebel və ağıllı satış sistemi
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
            SUPELLEX BAKU
          </h2>

          <p className="mt-6 text-lg md:text-2xl text-white/75 leading-relaxed">
            Mətbəx mebeli, interyer dizayn, fərdi layihələr, kredit imkanı və AI satış köməkçisi.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/994554131658" target="_blank" className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-2xl transition">
              WhatsApp ilə yaz
            </a>

            <a href="https://t.me/supellex_baku_bot" target="_blank" className="px-8 py-4 rounded-2xl bg-white text-blue-700 font-bold shadow-2xl hover:bg-blue-50 transition">
              Telegram Bot
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="xidmetler" className="max-w-7xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black">Xidmətlərimiz</h2>
          <p className="mt-4 text-white/60 text-lg">Ev və ofis üçün müasir mebel həlləri.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Mətbəx mebeli", "Ölçüyə uyğun, praktik və premium dizayn."],
            ["İnteryer dizayn", "Rəng, material və yerləşim üzrə peşəkar yanaşma."],
            ["Kredit imkanı", "Müştəri üçün rahat aylıq ödəniş hesablaması."],
          ].map(([title, text]) => (
            <div key={title} className="p-8 rounded-3xl bg-white/10 border border-white/10 shadow-2xl hover:-translate-y-2 transition">
              <h3 className="text-2xl font-black text-blue-300">{title}</h3>
              <p className="mt-4 text-white/65 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="kataloq" className="px-5 py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black">Məhsul kataloqu</h2>
            <p className="mt-4 text-slate-600 text-lg">Sonra şəkilləri bu bölməyə əlavə edəcəyik.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((item) => (
              <div key={item.title} className="rounded-3xl overflow-hidden bg-slate-100 shadow-xl">
                <div className="h-64 bg-slate-300 flex items-center justify-center text-slate-500">
                  Şəkil yeri
                </div>

                <div className="p-6">
                  <p className="text-sm text-blue-600 font-bold">{item.category}</p>
                  <h3 className="text-2xl font-black mt-2">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.price}</p>

                  <a href="https://wa.me/994554131658" target="_blank" className="inline-block mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold">
                    Sifariş et
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videolar" className="max-w-7xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black">Video işlərimiz</h2>
          <p className="mt-4 text-white/60 text-lg">Sonra videoları bu sistemə əlavə edəcəyik.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((item) => (
            <div key={item.title} className="rounded-3xl bg-white/10 border border-white/10 p-5 shadow-2xl">
              <div className="h-72 rounded-2xl bg-slate-800 flex items-center justify-center text-white/50">
                Video yeri
              </div>
              <h3 className="mt-5 text-2xl font-black text-blue-300">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CREDIT CALCULATOR */}
      <section id="kredit" className="px-5 py-24 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black">Kredit kalkulyatoru</h2>
            <p className="mt-4 text-slate-600 text-lg">Sadə ilkin hesablama üçündür.</p>
          </div>

          <div className="rounded-3xl bg-slate-100 p-6 md:p-10 shadow-xl">
            <label className="font-bold">Mebel qiyməti: {amount} AZN</label>
            <input type="range" min="500" max="10000" step="100" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full mt-3" />

            <label className="font-bold block mt-8">Müddət: {months} ay</label>
            <input type="range" min="3" max="24" step="1" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full mt-3" />

            <div className="mt-8 rounded-2xl bg-blue-600 text-white p-6 text-center">
              <p className="text-lg">Təxmini aylıq ödəniş</p>
              <h3 className="text-4xl font-black mt-2">{monthly} AZN</h3>
            </div>

            <a href="https://wa.me/994554131658" target="_blank" className="block text-center mt-6 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold">
              Kredit üçün WhatsApp-a yaz
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="elaqe" className="max-w-7xl mx-auto px-5 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-black">Əlaqə</h2>
        <p className="mt-4 text-white/60 text-lg">Sifariş və konsultasiya üçün bizə yazın.</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/994554131658" target="_blank" className="px-8 py-4 rounded-2xl bg-green-500 text-white font-bold">WhatsApp</a>
          <a href="https://t.me/supellex_baku_bot" target="_blank" className="px-8 py-4 rounded-2xl bg-sky-500 text-white font-bold">Telegram</a>
        </div>
      </section>

      {/* FLOAT BUTTONS */}
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
        <a href="https://wa.me/994554131658" target="_blank" className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-2xl shadow-2xl">☘️</a>
        <a href="https://t.me/supellex_baku_bot" target="_blank" className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-2xl shadow-2xl">✈️</a>
      </div>

      {/* AI CHAT */}
      <div className="fixed left-5 bottom-5 z-50">
        {chatOpen && (
          <div className="mb-4 w-80 max-w-[90vw] rounded-3xl bg-white text-slate-900 shadow-2xl overflow-hidden border border-blue-200">
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-black">Supellex AI</h3>
                <p className="text-xs text-blue-100">Satış köməkçisi</p>
              </div>

              <button onClick={() => setChatOpen(false)} className="text-white text-2xl">×</button>
            </div>

            <div className="p-4 space-y-3 text-sm">
              <div className="bg-slate-100 rounded-2xl p-3">
                Salam 👋 Mən Supellex Baku AI köməkçisiyəm. Mebel, kredit və sifariş barədə sual verə bilərsiniz.
              </div>

              <input type="text" placeholder="Mesajınızı yazın..." className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-500" />

              <button className="w-full bg-blue-600 text-white rounded-2xl py-3 font-bold hover:bg-blue-700 transition">
                Göndər
              </button>
            </div>
          </div>
        )}

        <button onClick={() => setChatOpen(!chatOpen)} className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl shadow-2xl transition">
          🤖
        </button>
      </div>

    </main>
  );
      }
