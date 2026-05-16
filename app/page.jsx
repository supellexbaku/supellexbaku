"use client";

import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [activeMuraciet, setActiveMuraciet] = useState("sikayet");
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Salam 👋 Mən Supellex Baku AI köməkçisiyəm. Mebel sifarişi, qiymət, ölçü və əlaqə barədə kömək edə bilərəm.",
    },
  ]);

  const whatsapp = "https://wa.me/994554131658";
  const telegram = "https://t.me/supellex_baku_bot";

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
      id: "sikayet",
      ad: "Şikayət",
      basliq: "Şikayət göndər",
      metn: "Məhsul, xidmət və ya çatdırılma ilə bağlı probleminizi bizə yazın.",
      mesaj: "Salam, Supellex Baku ilə bağlı şikayətim var.",
    },
    {
      id: "vakansiya",
      ad: "Vakansiya",
      basliq: "İş müraciəti",
      metn: "Mebel sahəsində işləmək istəyirsinizsə, məlumatlarınızı göndərin.",
      mesaj: "Salam, Supellex Baku vakansiyası ilə maraqlanıram.",
    },
    {
      id: "terefdasliq",
      ad: "Tərəfdaşlıq",
      basliq: "Tərəfdaşlıq təklifi",
      metn: "Satış, material, reklam və ya istehsal üzrə əməkdaşlıq təklifinizi yazın.",
      mesaj: "Salam, Supellex Baku ilə tərəfdaşlıq etmək istəyirəm.",
    },
    {
      id: "ikinci-el",
      ad: "İkinci əl mebel",
      basliq: "İkinci əl mebel təklifi",
      metn: "Satmaq istədiyiniz ikinci əl mebel haqqında şəkil və məlumat göndərin.",
      mesaj: "Salam, ikinci əl mebel təklif etmək istəyirəm.",
    },
  ];

  const aktiv = muracietler.find((item) => item.id === activeMuraciet);

  function isWorkTime() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 19;
  }

  function sendAiMessage() {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    const botText = isWorkTime()
      ? "Mesajınız qəbul edildi ✅ İş vaxtıdır. Komandamız sizinlə əlaqə saxlaya bilər. Daha sürətli cavab üçün WhatsApp və ya Telegram düyməsindən yazın."
      : "Hazırda iş vaxtı deyil 🌙 İş saatlarımız 09:00–19:00 arasıdır. Mən ilkin məlumat verə bilərəm, komanda isə iş vaxtında sizinlə əlaqə saxlayacaq.";

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "bot", text: botText },
    ]);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
          </button>

          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Supellex Baku
          </h1>

          <a
            href={whatsapp}
            target="_blank"
            className="px-4 py-3 rounded-2xl bg-white text-black text-sm font-semibold"
          >
            Sifariş
          </a>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50">
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
              <a href={whatsapp} target="_blank" className="block p-4 rounded-2xl bg-green-600">
                WhatsApp
              </a>
              <a href={telegram} target="_blank" className="block p-4 rounded-2xl bg-blue-600">
                Telegram
              </a>
            </div>
          </aside>
        </div>
      )}

      <section className="pt-32 pb-20 px-5 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-white/50 mb-4">Premium mebel həlləri</p>
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
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-white/40 mb-2">Məhsullar</p>
            <h2 className="text-4xl font-bold">Kataloq</h2>
          </div>
          <p className="text-white/40 text-sm">Cloudinary şəkil sistemi</p>
        </div>

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
                  Soruş
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="muracietler" className="px-5 pb-24 max-w-7xl mx-auto">
        <p className="text-white/40 mb-2">Əlaqə və müraciət</p>
        <h2 className="text-4xl font-bold mb-8">Müraciətlər</h2>

        <div className="rounded-[32px] bg-white/5 border border-white/10 p-4 md:p-6">
          <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
            {muracietler.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMuraciet(item.id)}
                className={`shrink-0 px-5 py-3 rounded-2xl transition ${
                  activeMuraciet === item.id
                    ? "bg-white text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {item.ad}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">{aktiv.basliq}</h3>
              <p className="text-white/60 mb-6">{aktiv.metn}</p>

              <a
                href={`${whatsapp}?text=${aktiv.mesaj}`}
                target="_blank"
                className="inline-block px-7 py-4 rounded-2xl bg-green-600 font-semibold"
              >
                WhatsApp ilə göndər
              </a>
            </div>

            <div className="rounded-[28px] bg-black/40 border border-white/10 p-5">
              <p className="text-white/40 mb-3">Seçilmiş bölmə</p>
              <h4 className="text-2xl font-bold mb-3">{aktiv.ad}</h4>
              <p className="text-white/60">
                Bu bölmə hələlik WhatsApp yönləndirməsi ilə işləyir. Sonra
                bunu admin panel və Gmail bildirişi ilə birləşdirəcəyik.
              </p>
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-white text-black shadow-2xl hover:scale-110 active:scale-95 transition flex items-center justify-center text-2xl"
      >
        🤖
      </button>

      {aiOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-[30px] bg-[#111] border border-white/10 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold">Supellex AI Bot</h3>
                <p className="text-xs text-white/40">
                  Saat görünmür, sistem özü iş vaxtını yoxlayır
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