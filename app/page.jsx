export default function Sehife() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-black text-blue-700">
            SUPELLEX
          </h1>

          <div className="hidden md:flex gap-8 font-semibold">
            <a href="#xidmetler">Xidmətlər</a>
            <a href="#layiheler">Layihələr</a>
            <a href="#elaqe">Əlaqə</a>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-b from-blue-700 via-blue-500 to-white">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-72 h-72 bg-white rounded-full blur-3xl top-10 left-10"></div>
          <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl bottom-10 right-10"></div>
        </div>

        <div className="relative z-10 max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Premium Mebel və İnteryer Dizayn
          </h1>

          <p className="text-white text-lg md:text-2xl mb-10">
            Müasir dizayn, keyfiyyətli material və sərfəli kredit imkanları
          </p>

          <div className="flex flex-wrap gap-4 justify-center">

            <a
              href="https://wa.me/994551112233"
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 transition"
            >
              WhatsApp
            </a>

            <a
              href="tel:+994551112233"
              className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 transition"
            >
              Zəng Et
            </a>

          </div>

        </div>

      </section>

      {/* XİDMƏTLƏR */}
      <section id="xidmetler" className="py-24 px-6">

        <h2 className="text-5xl font-black text-center mb-16">
          Xidmətlərimiz
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

          <div className="bg-white p-10 rounded-3xl shadow-2xl border hover:-translate-y-2 transition">
            <div className="text-5xl mb-6">🛋️</div>

            <h3 className="text-2xl font-bold mb-4">
              Mebel Sifarişi
            </h3>

            <p className="text-gray-600 leading-7">
              MDF, laminat, modern və klassik premium mebellər.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl border hover:-translate-y-2 transition">
            <div className="text-5xl mb-6">🏠</div>

            <h3 className="text-2xl font-bold mb-4">
              İnteryer Dizayn
            </h3>

            <p className="text-gray-600 leading-7">
              Mənzil, villa və obyektlər üçün premium interyer həlləri.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl border hover:-translate-y-2 transition">
            <div className="text-5xl mb-6">💳</div>

            <h3 className="text-2xl font-bold mb-4">
              Kredit Sistemi
            </h3>

            <p className="text-gray-600 leading-7">
              İlkin ödəniş və aylıq hissələrlə rahat alış imkanı.
            </p>
          </div>

        </div>

      </section>

      {/* LAYİHƏLƏR */}
      <section id="layiheler" className="py-24 px-6 bg-gray-50">

        <h2 className="text-5xl font-black text-center mb-16">
          Son Layihələr
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          <div className="h-80 rounded-3xl bg-gradient-to-br from-blue-300 to-blue-700 shadow-2xl"></div>

          <div className="h-80 rounded-3xl bg-gradient-to-br from-gray-300 to-gray-700 shadow-2xl"></div>

          <div className="h-80 rounded-3xl bg-gradient-to-br from-slate-300 to-slate-700 shadow-2xl"></div>

        </div>

      </section>

      {/* ƏLAQƏ */}
      <section id="elaqe" className="py-24 px-6">

        <div className="max-w-5xl mx-auto bg-blue-700 rounded-[40px] p-12 text-white shadow-2xl">

          <h2 className="text-5xl font-black mb-10 text-center">
            Əlaqə
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <p className="text-xl mb-4">
                📞 +994 55 111 22 33
              </p>

              <p className="text-xl mb-4">
                📍 Bakı, Azərbaycan
              </p>

              <p className="text-xl">
                ✉️ supellex@gmail.com
              </p>
            </div>

            <div className="flex flex-col gap-4">

              <a
                href="https://wa.me/994551112233"
                className="bg-white text-blue-700 text-center py-4 rounded-2xl font-bold"
              >
                WhatsApp Yaz
              </a>

              <a
                href="https://t.me/SUPELLEXBOT"
                className="bg-blue-900 text-white text-center py-4 rounded-2xl font-bold"
              >
                Telegram Bot
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

        <a
          href="https://t.me/SUPELLEXBOT"
          className="w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition"
        >
          ✈️
        </a>

        <button className="w-16 h-16 rounded-full bg-blue-700 text-white text-3xl shadow-2xl hover:scale-110 transition">
          💬
        </button>

      </div>

    </div>
  )
}
