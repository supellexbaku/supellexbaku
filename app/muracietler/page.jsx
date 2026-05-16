"use client";

export default function MuracietlerPage() {

  function isWorkTime() {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 19;
  }

  const workMessage = isWorkTime()
    ? "Müraciət göndərilə bilər."
    : "Hazırda qeyri-iş saatıdır. Müraciətiniz qeydə alınacaq.";

  const forms = [
    {
      title: "Geri bildiriş / Şikayət",
      desc: "Narazılıq, problem və təkliflərinizi göndərin.",
      color: "from-red-500 to-orange-400"
    },
    {
      title: "Vakansiya",
      desc: "Usta kimi işləmək istəyənlər üçün müraciət.",
      color: "from-blue-600 to-cyan-400"
    },
    {
      title: "Reklam / Tərəfdaşlıq",
      desc: "Əməkdaşlıq və reklam müraciətləri.",
      color: "from-purple-600 to-pink-500"
    },
    {
      title: "İkinci əl mebel al/sat",
      desc: "İkinci əl mebel almaq və ya satmaq üçün.",
      color: "from-green-500 to-emerald-400"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white px-5 py-24">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">

          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
          >
            ← Ana səhifəyə qayıt
          </a>

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
            Müraciətlər
          </h1>

          <p className="mt-6 text-xl text-white/60 max-w-3xl mx-auto">
            Vakansiya, şikayət, tərəfdaşlıq və ikinci əl mebel müraciətləri.
          </p>

        </div>

        {/* FORMS */}
        <div className="grid md:grid-cols-2 gap-8">

          {forms.map((form) => (

            <form
              key={form.title}
              onSubmit={(e) => {
                e.preventDefault();
                alert(workMessage);
              }}
              className="rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
            >

              {/* TOP */}
              <div className={`bg-gradient-to-r ${form.color} p-8`}>

                <h2 className="text-3xl font-black">
                  {form.title}
                </h2>

                <p className="mt-3 text-white/80">
                  {form.desc}
                </p>

              </div>

              {/* BODY */}
              <div className="p-8">

                <input
                  type="text"
                  placeholder="Adınız"
                  className="w-full p-4 rounded-2xl bg-white text-slate-900 placeholder-slate-500 outline-none"
                />

                <input
                  type="tel"
                  placeholder="Telefon nömrəniz"
                  className="w-full mt-4 p-4 rounded-2xl bg-white text-slate-900 placeholder-slate-500 outline-none"
                />

                <textarea
                  placeholder="Mesajınız"
                  className="w-full mt-4 p-4 rounded-2xl bg-white text-slate-900 placeholder-slate-500 outline-none h-36"
                ></textarea>

                {/* FILE */}
                <div className="mt-4">

                  <label className="block text-sm text-white/60 mb-2">
                    Şəkil və ya fayl əlavə edin
                  </label>

                  <input
                    type="file"
                    className="w-full rounded-2xl bg-white text-slate-900 p-3"
                  />

                </div>

                {/* BUTTON */}
                <button
                  className={`w-full mt-6 py-4 rounded-2xl bg-gradient-to-r ${form.color} text-white font-black text-lg hover:scale-[1.02] transition`}
                >
                  Müraciəti göndər
                </button>

                <p className="mt-4 text-sm text-white/40 text-center">
                  {workMessage}
                </p>

              </div>

            </form>

          ))}

        </div>

      </div>

    </main>
  );
}
