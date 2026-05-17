"use client";

import { useState } from "react";

export default function HomePage() {
  const AI_BACKEND_URL =
    "https://friendly-palm-tree-4q7jr4757v4h5j45-3000.app.github.dev/chat";

  const whatsapp = "https://wa.me/994554131658";
  const telegram = "https://t.me/supellex_baku_bot";

  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Salam 👋 Mən Supellex Baku AI köməkçisiyəm. Mebel sifarişi, ölçü, qiymət və xidmətlər barədə kömək edə bilərəm.",
    },
  ]);

  const katalog = [
    {
      id: 1,
      ad: "Mətbəx mebeli",
      kateqoriya: "Mətbəx",
      qiymet: "Razılaşma ilə",
      sekil:
        "https://res.cloudinary.com/dvjkyyk9z/image/upload/v1778955122/20250516_181657_chat8b.jpg",
    },
    {
      id: 2,
      ad: "Qarderob",
      kateqoriya: "Yataq otağı",
      qiymet: "Razılaşma ilə",
      sekil:
        "https://res.cloudinary.com/dvjkyyk9z/image/upload/v1778955122/20250516_181657_chat8b.jpg",
    },
    {
      id: 3,
      ad: "TV stend",
      kateqoriya: "Qonaq otağı",
      qiymet: "Razılaşma ilə",
      sekil:
        "https://res.cloudinary.com/dvjkyyk9z/image/upload/v1778955122/20250516_181657_chat8b.jpg",
    },
  ];

  const muracietler = [
    {
      id: 1,
      ad: "Şikayət",
      metn: "Xidmət və ya məhsulla bağlı probleminizi göndərin.",
      mesaj: "Salam, Supellex Baku ilə bağlı şikayətim var.",
    },
    {
      id: 2,
      ad: "Vakansiya",
      metn: "Mebel sahəsində işləmək istəyirsinizsə, müraciət edin.",
      mesaj: "Salam, Supellex Baku vakansiyası ilə maraqlanıram.",
    },
    {
      id: 3,
      ad: "Tərəfdaşlıq",
      metn: "Satış, reklam, material və ya istehsal üzrə əməkdaşlıq.",
      mesaj: "Salam, Supellex Baku ilə tərəfdaşlıq etmək istəyirəm.",
    },
    {
      id: 4,
      ad: "İkinci əl mebel",
      metn: "Satmaq istədiyiniz ikinci əl mebel barədə məlumat göndərin.",
      mesaj: "Salam, ikinci əl mebel təklif etmək istəyirəm.",
    },
  ];

  async function sendAiMessage() {
    if (!input.trim()) return;

    const userText = input.trim();

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(AI_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "AI cavab verdi, amma mətn boş gəldi.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "AI serverə qoşula bilmədim. 3000 portunun Public olduğuna və backendin işlədiyinə baxın.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
          </button>

          <h1 className="text-xl md:text-2xl font-bold">Supellex Baku</h1>

          <button
            onClick={() => setAiOpen(true)}
            className="px-5 py-3 rounded-2xl bg-white text-black font-semibold"
          >
            AI
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/70"
          ></div>

          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-[#0d0d0d] border-r border-white/10 p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Menyu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <a href="#katalog" className="block p-4 rounded-2xl bg-white/5">
                Kataloq
              </a>

              <a
                href="#muracietler"
                className="block p-4 rounded-2xl bg-white/5"
              >
                Müraciətlər
              </a>

              <a
                href={whatsapp}
                target="_blank"
                className="block p-4 rounded-2xl bg-green-600"
              >
                WhatsApp
              </a>

              <a
                href={telegram}
                target="_blank"
                className="block p-4 rounded-2xl bg-blue-600"
              >
                Telegram
              </a>
            </div>
          </aside>
        </div>
      )}

      <section className="pt-32 pb-20 px-5 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-white/40 mb-4">Premium mebel həlləri</p>

            <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Evinizə uyğun ölçüdə mebel
            </h2>

            <p className="text-white/60 text-lg mb-8">
              Mətbəx, qarderob, TV stend, yataq otağı və fərdi ölçü ilə mebel
              sifarişləri.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsapp}
                target="_blank"
                className="px-7 py-4 rounded-2xl bg-green-600 font-semibold"
              >
                WhatsApp
              </a>

              <a
                href={telegram}
                target="_blank"
                className="px-7 py-4 rounded-2xl bg-blue-600 font-semibold"
              >
                Telegram
              </a>

              <button
                onClick={() => setAiOpen(true)}
                className="px-7 py-4 rounded-2xl bg-white text-black font-semibold"
              >
                AI ilə yaz
              </button>
            </div>
          </div>

          <div className="rounded-[36px] bg-white/5 border border-white/10 p-4 shadow-2xl">
            <img
              src={katalog[0].sekil}
              alt="Supellex Baku"
              className="w-full h-[430px] object-cover rounded-[28px]"
            />
          </div>
        </div>
      </section>

      <section id="katalog" className="px-5 pb-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">Kataloq</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {katalog.map((item) => (
            <div
              key={item.id}
              className="rounded-[30px] bg-white/5 border border-white/10 overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={item.sekil}
                alt={item.ad}
                className="w-full h-80 object-cover"
              />

              <div className="p-5">
                <p className="text-white/40 text-sm mb-2">{item.kateqoriya}</p>
                <h3 className="text-2xl font-semibold mb-2">{item.ad}</h3>
                <p className="text-white/50 mb-5">{item.qiymet}</p>

                <a
                  href={`${whatsapp}?text=Salam, ${item.ad} haqqında məlumat istəyirəm.`}
                  target="_blank"
                  className="block text-center px-5 py-3 rounded-2xl bg-white text-black font-semibold"
                >
                  Məlumat al
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="muracietler" className="px-5 pb-24 max-w-7xl mx-auto">
        <p className="text-white/40 mb-2">Əlaqə və müraciət</p>
        <h2 className="text-4xl font-bold mb-8">Müraciətlər</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {muracietler.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-[28px] bg-white/5 border border-white/10"
            >
              <h3 className="text-2xl font-semibold mb-3">{item.ad}</h3>
              <p className="text-white/50 mb-6">{item.metn}</p>

              <a
                href={`${whatsapp}?text=${item.mesaj}`}
                target="_blank"
                className="inline-block px-5 py-3 rounded-2xl bg-white text-black font-semibold"
              >
                Göndər
              </a>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-white text-black shadow-2xl hover:scale-110 active:scale-95 transition flex items-center justify-center text-2xl"
      >
        🤖
      </button>

      {aiOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center p-4 z-[70]">
          <div className="w-full max-w-md rounded-[30px] bg-[#111] border border-white/10 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold">Supellex AI Bot</h3>
                <p className="text-xs text-white/40">
                  3000 AI serverə qoşulub
                </p>
              </div>

              <button onClick={() => setAiOpen(false)}>✕</button>
            </div>

            <div className="h-80 overflow-y-auto p-5 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 ml-10"
                      : "bg-white/10 mr-10"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="p-3 rounded-2xl text-sm bg-white/10 mr-10">
                  Yazır...
                </div>
              )}
            </div>

            <div className="p-4 flex gap-2 border-t border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendAiMessage()}
                placeholder="Mesaj yazın..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white/10 outline-none"
              />

              <button
                onClick={sendAiMessage}
                disabled={loading}
                className="px-5 py-3 rounded-2xl bg-white text-black font-semibold disabled:opacity-50"
              >
                Göndər
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}