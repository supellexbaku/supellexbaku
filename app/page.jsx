"use client";

import { useState } from "react";

export default function Page() {
  const [aiOpen, setAiOpen] = useState(false);
  const [amount, setAmount] = useState(2500);
  const [months, setMonths] = useState(12);
  const [activeImage, setActiveImage] = useState(null);

  const monthly = Math.round(amount / months);

  function isWorkTime() {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 19;
  }

  const workMessage = isWorkTime()
    ? "Müraciətiniz qəbul edilə bilər."
    : "Hazırda qeyri-iş saatıdır. Müraciətiniz qeydə alınacaq, iş vaxtında cavab veriləcək.";

  const products = [
    "Mətbəx mebeli",
    "Qonaq otağı",
    "Yataq otağı",
    "Aksesuarlar",
    "İkinci əl mebel",
    "Ofis mebeli",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-blue-400">SUPELLEX</h1>

          <nav className="hidden md:flex gap-6 text-sm text-white/80">
            <a href="#kataloq">Kataloq</a>
            <a href="#aksesuar">Aksesuar</a>
            <a href="#kredit">Kredit</a>
            <a href="#rey">Rəylər</a>
            <a href="#vakansiya">Vakansiya</a>
            <a href="#elaqe">Əlaqə</a>
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
            Mətbəx mebeli, interyer dizayn, kredit, aksesuarlar, ikinci əl mebel və AI satış köməkçisi.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/994554131658" target="_blank" className="px-8 py-4 rounded-2xl bg-green-500 font-bold">
              WhatsApp
            </a>
            <a href="https://t.me/supellex_baku_bot" target="_blank" className="px-8 py-4 rounded-2xl bg-sky-500 font-bold">
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="kataloq" className="px-5 py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center">Məhsul kataloqu</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {products.map((item, i) => (
              <div key={item} className="rounded-3xl bg-slate-100 overflow-hidden shadow-xl">
                <button
                  onClick={() => setActiveImage(item)}
                  className="h-64 w-full bg-slate-300 flex items-center justify-center text-slate-600"
                >
                  Full screen şəkil yeri
                </button>

                <div className="p-6">
                  <h3 className="text-2xl font-black">{item}</h3>
                  <p className="text-slate-600 mt-2">Qiymət razılaşma ilə</p>
                  <a href="https://wa.me/994554131658" target="_blank" className="inline-block mt-5 bg-green-500 text-white px-5 py-3 rounded-xl font-bold">
                    Sifariş et
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESSORIES */}
      <section id="aksesuar" className="max-w-7xl mx-auto px-5 py-24">
        <h2 className="text-4xl font-black text-center">Aksesuarlar</h2>

        <div className="grid md:grid-cols-4 gap-5 mt-10">
          {["Tutacaqlar", "Mexanizmlər", "MDF", "Rəng seçimi"].map((x) => (
            <div key={x} className="p-6 rounded-3xl bg-white/10 border border-white/10 text-center">
              <h3 className="text-xl font-black text-blue-300">{x}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section className="px-5 py-24 bg-slate-900">
        <h2 className="text-4xl font-black text-center">Video işlərimiz</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-7xl mx-auto">
          {[1, 2].map((v) => (
            <div key={v} className="rounded-3xl bg-white/10 p-5">
              <div className="h-72 rounded-2xl bg-slate-800 flex items-center justify-center text-white/50">
                Full screen video yeri
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CREDIT */}
      <section id="kredit" className="px-5 py-24 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center">Kredit kalkulyatoru</h2>

          <div className="mt-10 rounded-3xl bg-slate-100 p-8">
            <label className="font-bold">Mebel qiyməti: {amount} AZN</label>
            <input className="w-full mt-3" type="range" min="500" max="10000" step="100" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />

            <label className="font-bold block mt-6">Müddət: {months} ay</label>
            <input className="w-full mt-3" type="range" min="3" max="24" value={months} onChange={(e) => setMonths(Number(e.target.value))} />

            <div className="mt-8 bg-blue-600 text-white p-6 rounded-2xl text-center">
              <p>Aylıq təxmini ödəniş</p>
              <h3 className="text-4xl font-black">{monthly} AZN</h3>
            </div>
          </div>
        </div>
      </section>

      {/* FORMS */}
      <section className="max-w-7xl mx-auto px-5 py-24 grid md:grid-cols-2 gap-6">

        {[
          ["Geri bildiriş / Şikayət", "/feedback", "Narazılıq, təklif və problem yazın"],
          ["Vakansiya", "/vacancy", "Usta kimi işləmək istəyənlər üçün"],
          ["Reklam / Tərəfdaşlıq", "/partnership", "Əməkdaşlıq müraciəti göndərin"],
          ["İkinci əl mebel al/sat", "/secondhand", "Almaq və ya satmaq istəyənlər üçün"],
        ].map(([title, endpoint, desc]) => (
          <form
            key={title}
            onSubmit={(e) => {
              e.preventDefault();
              alert(workMessage);
            }}
            className="rounded-3xl bg-white/10 border border-white/10 p-6"
          >
            <h3 className="text-2xl font-black text-blue-300">{title}</h3>
            <p className="text-white/60 mt-2">{desc}</p>

            <input className="w-full mt-5 p-3 rounded-xl text-slate-900" placeholder="Adınız" />
            <input className="w-full mt-3 p-3 rounded-xl text-slate-900" placeholder="Telefon nömrəsi" />
            <textarea className="w-full mt-3 p-3 rounded-xl text-slate-900 h-28" placeholder="Mesajınız"></textarea>

            <button className="mt-4 w-full bg-blue-600 py-3 rounded-xl font-bold">
              Göndər
            </button>

            <p className="text-xs text-white/50 mt-3">{workMessage}</p>
          </form>
        ))}
      </section>

      {/* REVIEWS */}
      <section id="rey" className="px-5 py-24 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center">Rəy yazın</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Rəyiniz qeydə alındı.");
            }}
            className="mt-10 rounded-3xl bg-slate-100 p-8"
          >
            <input className="w-full p-3 rounded-xl" placeholder="Adınız" />
            <select className="w-full p-3 rounded-xl mt-3">
              <option>5 ulduz</option>
              <option>4 ulduz</option>
              <option>3 ulduz</option>
              <option>2 ulduz</option>
              <option>1 ulduz</option>
            </select>
            <textarea className="w-full p-3 rounded-xl mt-3 h-28" placeholder="Rəyiniz"></textarea>
            <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
              Rəyi göndər
            </button>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <footer id="elaqe" className="px-5 py-16 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-black text-blue-400">SUPELLEX BAKU</h3>
            <p className="text-white/60 mt-3">Müştəri məmnuniyyəti ön plandadır.</p>
          </div>

          <div>
            <h4 className="font-black">Əlaqə</h4>
            <p className="text-white/60 mt-2">WhatsApp: 055 413 16 58</p>
            <p className="text-white/60">Telegram: @supellex_baku_bot</p>
            <p className="text-white/60">Email: supellexbaku@gmail.com</p>
          </div>

          <div>
            <h4 className="font-black">İş saatı</h4>
            <p className="text-white/60 mt-2">09:00 - 19:00</p>
            <p className="text-white/60">Ünvan: Bakı, Azərbaycan</p>
          </div>
        </div>
      </footer>

      {/* FULL SCREEN MODAL */}
      {activeImage && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-5">
          <button onClick={() => setActiveImage(null)} className="absolute top-5 right-5 text-white text-4xl">×</button>
          <div className="max-w-4xl w-full h-[70vh] rounded-3xl bg-slate-800 flex items-center justify-center text-white/60 text-3xl">
            {activeImage}
          </div>
        </div>
      )}

      {/* AI PAGE MODAL */}
      {aiOpen && (
        <div className="fixed inset-0 z-[998] bg-slate-950 text-white p-5 overflow-auto">
          <button onClick={() => setAiOpen(false)} className="fixed top-5 right-5 text-4xl">×</button>

          <div className="max-w-4xl mx-auto pt-20">
            <h2 className="text-5xl font-black text-blue-400">Supellex AI</h2>
            <p className="text-white/60 mt-3">Sayt daxilində AI satış köməkçisi.</p>

            <div className="mt-8 bg-white text-slate-900 rounded-3xl p-6">
              <div className="bg-slate-100 rounded-2xl p-4">
                Salam 👋 Mebel, kredit, sifariş və interyer barədə sual verə bilərsiniz.
              </div>

              <textarea className="w-full mt-5 border p-4 rounded-2xl h-32" placeholder="Mesajınızı yazın..."></textarea>

              <button
                onClick={() => alert(workMessage)}
                className="mt-4 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold"
              >
                AI-yə göndər
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOAT BUTTONS */}
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
        <a href="https://wa.me/994554131658" target="_blank" className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-2xl">☎</a>
        <a href="https://t.me/supellex_baku_bot" target="_blank" className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-2xl">✈</a>
      </div>

      <button
        onClick={() => setAiOpen(true)}
        className="fixed left-5 bottom-5 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-3xl shadow-2xl"
      >
        🤖
      </button>

    </main>
  );
}
