export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-blue-400">
            SUPELLEX
          </h1>

          <nav className="hidden md:flex gap-8 text-sm text-white/80">
            <a href="#xidmetler" className="hover:text-blue-400">Xidmətlər</a>
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
            Mətbəx mebeli, interyer dizayn, fərdi layihələr və sərfəli kredit imkanları.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/994554131658"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-2xl transition"
            >
              WhatsApp ilə yaz
            </a>

            <a
              href="https://t.me/supellex_baku_bot"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-white text-blue-700 font-bold shadow-2xl hover:bg-blue-50 transition"
            >
              Telegram Bot
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="xidmetler" className="max-w-7xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black">Xidmətlərimiz</h2>
          <p className="mt-4 text-white/60 text-lg">
            Ev və ofis üçün müasir mebel həlləri.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Mətbəx mebeli", "Ölçüyə uyğun, praktik və premium dizayn."],
            ["İnteryer dizayn", "Rəng, material və yerləşim üzrə peşəkar yanaşma."],
            ["Kredit imkanı", "Müştəri üçün rahat aylıq ödəniş hesablaması."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="p-8 rounded-3xl bg-white/10 border border-white/10 shadow-2xl hover:-translate-y-2 transition"
            >
              <h3 className="text-2xl font-black text-blue-300">{title}</h3>
              <p className="mt-4 text-white/65 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CREDIT */}
      <section id="kredit" className="px-5 py-24 bg-white text-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Kreditlə mebel almaq mümkündür
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            Müştəri ilkin ödəniş və aylıq ödəniş barədə məlumat ala bilər.
          </p>

          <a
            href="https://wa.me/994554131658"
            target="_blank"
            className="inline-block mt-8 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl hover:bg-blue-700 transition"
          >
            Kredit haqqında soruş
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="elaqe" className="max-w-7xl mx-auto px-5 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-black">Əlaqə</h2>
        <p className="mt-4 text-white/60 text-lg">
          Sifariş və konsultasiya üçün bizə yazın.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/994554131658"
            target="_blank"
            className="px-8 py-4 rounded-2xl bg-green-500 text-white font-bold"
          >
            WhatsApp
          </a>

          <a
            href="https://t.me/supellex_baku_bot"
            target="_blank"
            className="px-8 py-4 rounded-2xl bg-sky-500 text-white font-bold"
          >
            Telegram
          </a>
        </div>
      </section>

      {/* FLOAT BUTTONS */}
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/994554131658"
          target="_blank"
          className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-2xl shadow-2xl"
        >
          ☘️
        </a>

        <a
          href="https://t.me/supellex_baku_bot"
          target="_blank"
          className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-2xl shadow-2xl"
        >
          ✈️
        </a>
      </div>

    </main>
  );
}
