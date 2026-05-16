"use client";

import { useState } from "react";

export default function MuracietlerPage() {
  const [selected, setSelected] = useState("feedback");

  function isWorkTime() {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 19;
  }

  const workMessage = isWorkTime()
    ? "Müraciətiniz qəbul edildi."
    : "Hazırda qeyri-iş saatıdır. Müraciətiniz qeydə alınacaq, iş vaxtında cavab veriləcək.";

  const forms = [
    {
      id: "feedback",
      title: "Geri bildiriş / Şikayət",
      desc: "Narazılıq, gecikmə, problem və təkliflərinizi göndərin.",
      button: "Şikayət göndər",
      gradient: "from-red-500 to-orange-400",
      fields: ["Adınız", "Telefon nömrəniz", "Sifariş nömrəsi"],
      textarea: "Problemi və ya təklifinizi yazın",
    },
    {
      id: "vacancy",
      title: "Vakansiya",
      desc: "Supellex Baku komandasında usta kimi işləmək istəyənlər üçün.",
      button: "Vakansiyaya müraciət et",
      gradient: "from-blue-600 to-cyan-400",
      fields: ["Adınız", "Telefon nömrəniz", "Peşəniz", "Təcrübəniz"],
      textarea: "Özünüz haqqında qısa məlumat yazın",
    },
    {
      id: "partnership",
      title: "Reklam / Tərəfdaşlıq",
      desc: "Reklam, barter, əməkdaşlıq və tərəfdaşlıq təklifləri üçün.",
      button: "Tərəfdaşlıq göndər",
      gradient: "from-purple-600 to-pink-500",
      fields: ["Adınız və ya şirkət adı", "Telefon nömrəniz", "Təklif növü"],
      textarea: "Əməkdaşlıq təklifinizi yazın",
    },
    {
      id: "secondhand",
      title: "İkinci əl mebel al/sat",
      desc: "İkinci əl mebel satmaq və ya almaq istəyənlər üçün.",
      button: "Elanı göndər",
      gradient: "from-green-500 to-emerald-400",
      fields: ["Adınız", "Telefon nömrəniz", "Mebel növü", "Qiymət"],
      textarea: "Mebel haqqında məlumat yazın",
    },
  ];

  const activeForm = forms.find((item) => item.id === selected);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-5 py-10">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-12">
        <a
          href="/"
          className="text-2xl font-black text-blue-400"
        >
          SUPELLEX
        </a>

        <a
          href="/"
          className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white/80 hover:text-white"
        >
          Ana səhifə
        </a>
      </header>

      {/* TITLE */}
      <section className="max-w-5xl mx-auto text-center pt-8 pb-12">
        <p className="inline-block px-5 py-2 rounded-full bg-white/10 text-blue-200 mb-5">
          Supellex Baku müraciət mərkəzi
        </p>

        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
          Müraciətlər
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/60">
          Şikayət, vakansiya, tərəfdaşlıq və ikinci əl mebel müraciətlərinizi buradan göndərin.
        </p>
      </section>

      {/* MENU CARDS */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-4 gap-5 mb-10">
        {forms.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`text-left rounded-3xl p-6 border transition ${
              selected === item.id
                ? "bg-white text-slate-950 border-white scale-[1.02]"
                : "bg-white/10 border-white/10 hover:bg-white/15"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.gradient} mb-4`}></div>

            <h3 className="text-xl font-black">
              {item.title}
            </h3>

            <p className={`mt-3 text-sm ${selected === item.id ? "text-slate-600" : "text-white/55"}`}>
              {item.desc}
            </p>
          </button>
        ))}
      </section>

      {/* ACTIVE FORM */}
      <section className="max-w-4xl mx-auto pb-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(workMessage);
          }}
          className="rounded-[36px] overflow-hidden bg-white/10 border border-white/10 shadow-2xl"
        >

          <div className={`p-8 bg-gradient-to-r ${activeForm.gradient}`}>
            <h2 className="text-3xl md:text-4xl font-black">
              {activeForm.title}
            </h2>

            <p className="mt-3 text-white/85">
              {activeForm.desc}
            </p>
          </div>

          <div className="p-6 md:p-8 bg-slate-900">

            <div className="grid md:grid-cols-2 gap-4">
              {activeForm.fields.map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  className="w-full p-4 rounded-2xl bg-white text-slate-900 placeholder-slate-500 outline-none border border-white focus:border-blue-400"
                />
              ))}
            </div>

            <textarea
              placeholder={activeForm.textarea}
              className="w-full mt-4 p-4 rounded-2xl bg-white text-slate-900 placeholder-slate-500 outline-none border border-white focus:border-blue-400 h-36"
            ></textarea>

            <div className="mt-4">
              <label className="block text-sm text-white/60 mb-2">
                Şəkil və ya fayl əlavə edin
              </label>

              <input
                type="file"
                className="w-full rounded-2xl bg-white text-slate-900 p-4"
              />
            </div>

            <button
              className={`w-full mt-6 py-4 rounded-2xl bg-gradient-to-r ${activeForm.gradient} text-white font-black text-lg hover:scale-[1.02] transition`}
            >
              {activeForm.button}
            </button>

          </div>

        </form>
      </section>

    </main>
  );
}
