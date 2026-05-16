"use client";

import { useState } from "react";

export default function HomePage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Salam! Mən Supellex Baku AI köməkçisiyəm. Sizə mebel, sifariş və əlaqə barədə kömək edə bilərəm.",
    },
  ]);
  const [input, setInput] = useState("");

  const katalog = [
    {
      id: 1,
      ad: "Mətbəx mebeli",
      qiymet: "Razılaşma ilə",
      sekil:
        "https://res.cloudinary.com/dvjkyyk9z/image/upload/v1778955122/20250516_181657_chat8b.jpg",
    },
  ];

  function isWorkTime() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 19;
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    const botText = isWorkTime()
      ? "Mesajınız qəbul edildi. İş vaxtı olduğu üçün komanda sizinlə əlaqə saxlayacaq. WhatsApp və Telegram düymələrindən də birbaşa yaza bilərsiniz."
      : "Hazırda iş vaxtı deyil. İş saatlarımız 09:00–19:00 arasıdır. Mən sizə ilkin məlumat verə bilərəm, komanda isə iş vaxtında sizinlə əlaqə saxlayacaq.";

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "bot", text: botText },
    ]);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-6 py-8 max-w-7xl mx-auto">
        <nav className="flex flex-wrap items-center justify-between gap-4 mb-16">
          <h1 className="text-2xl font-bold tracking-wide">Supellex Baku</h1>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/994554131658"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-500 transition"
            >
              WhatsApp
            </a>

            <a
              href="https://t.me/supellex_baku_bot"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition"
            >
              Telegram
            </a>

            <a
              href="/muracietler"
              className="px-5 py-3 rounded-2xl bg-white text-black hover:bg-gray-200 transition"
            >
              Müraciətlər
            </a>

            <button
              onClick={() => setAiOpen(true)}
              className="px-5 py-3 rounded-2xl border border-white/30 hover:bg-white/10 transition"
            >
              AI Bot
            </button>
          </div>
        </nav>

        <section className="grid md:grid-cols-2 gap-10 items-center mb-24">
          <div>
            <p className="text-sm text-white/50 mb-4">Premium mebel həlləri</p>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Evinizə uyğun ölçüdə mebel
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Mətbəx, qonaq otağı, yataq otağı və fərdi mebel sifarişləri.
              Sadə, premium və funksional dizayn.
            </p>

            <a
              href="https://wa.me/994554131658"
              target="_blank"
              className="inline-block px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Sifariş üçün yaz
            </a>
          </div>

          <div className="rounded-[32px] bg-white/5 border border-white/10 p-4">
            <img
              src={katalog[0].sekil}
              alt="Supellex Baku"
              className="w-full h-[420px] object-cover rounded-[24px]"
            />
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-10">Kataloq</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {katalog.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] bg-white/5 border border-white/10 overflow-hidden hover:scale-[1.02] transition"
              >
                <img
                  src={item.sekil}
                  alt={item.ad}
                  className="w-full h-80 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-semibold mb-2">{item.ad}</h3>
                  <p className="text-white/50 mb-5">{item.qiymet}</p>

                  <a
                    href={`https://wa.me/994554131658?text=Salam, ${item.ad} haqqında məlumat istəyirəm.`}
                    target="_blank"
                    className="block text-center px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-500 transition"
                  >
                    WhatsApp ilə soruş
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {aiOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-[28px] bg-[#111] border border-white/10 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-white/10">
              <h3 className="text-xl font-bold">Supellex AI Bot</h3>
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
            </div>

            <div className="p-4 flex gap-2 border-t border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Mesaj yazın..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white/10 outline-none"
              />

              <button
                onClick={sendMessage}
                className="px-5 py-3 rounded-2xl bg-white text-black font-semibold"
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