"use client";

import { useState } from "react";

export default function HomePage() {
  const AI_BACKEND_URL =
    "https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev/chat";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "Cavab boş gəldi." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "AI serverə qoşula bilmədim. Zəhmət olmasa yenidən cəhd edin." },
      ]);
    }
    setLoading(false);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C96A;
          --gold-dim: #8A6A2A;
          --black: #080808;
          --surface: #0E0E0E;
          --surface2: #141414;
          --border: rgba(201,168,76,0.15);
          --text: #F0EDE8;
          --text-muted: rgba(240,237,232,0.45);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--black);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .display { font-family: 'Cormorant Garamond', serif; }

        .gold-line {
          width: 40px;
          height: 1px;
          background: var(--gold);
          display: inline-block;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.55s; }

        .hover-gold {
          transition: color 0.2s;
        }
        .hover-gold:hover { color: var(--gold); }

        .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 4px;
          background: var(--gold);
          color: #080808;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }
        .btn-gold:active { transform: translateY(0); }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 4px;
          background: transparent;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-1px); }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .card:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-4px); }

        input:focus { outline: none; }
        button:focus { outline: none; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-img { height: 320px !important; }
          .katalog-grid { grid-template-columns: 1fr !important; }
          .muraciet-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-inner { flex-direction: column !important; gap: 20px !important; text-align: left !important; }
          .hero-title { font-size: 42px !important; }
          .section-title { font-size: 34px !important; }
          .header-inner { padding: 0 20px !important; }
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }

        @media (max-width: 480px) {
          .muraciet-grid { grid-template-columns: 1fr !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns a, .hero-btns button { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: "var(--black)", color: "var(--text)", overflowX: "hidden" }}>

        {/* HEADER */}
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
        }}>
          <div className="header-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              onClick={() => setMenuOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8 }}
            >
              <span style={{ width: 22, height: 1, background: "var(--text)", display: "block" }}></span>
              <span style={{ width: 14, height: 1, background: "var(--gold)", display: "block" }}></span>
              <span style={{ width: 22, height: 1, background: "var(--text)", display: "block" }}></span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="display" style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.12em", color: "var(--text)" }}>SUPELLEX</span>
              <span style={{ width: 1, height: 16, background: "var(--gold)", display: "inline-block" }}></span>
              <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--gold)", fontWeight: 300 }}>BAKU</span>
            </div>

            <button
              onClick={() => setAiOpen(true)}
              className="btn-outline"
              style={{ padding: "9px 20px", fontSize: 11, letterSpacing: "0.15em" }}
            >
              AI
            </button>
          </div>
        </header>

        {/* MENU DRAWER */}
        {menuOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
            <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)" }}></div>
            <aside style={{
              position: "absolute", left: 0, top: 0, height: "100%", width: 320,
              background: "var(--surface)", borderRight: "1px solid var(--border)",
              padding: "40px 32px", animation: "fadeIn 0.25s ease"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
                <div>
                  <p className="display" style={{ fontSize: 28, fontWeight: 400, letterSpacing: "0.1em" }}>MENYU</p>
                  <span className="gold-line" style={{ marginTop: 8, display: "block" }}></span>
                </div>
                <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 20 }}>✕</button>
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { label: "Kataloq", href: "#katalog" },
                  { label: "Müraciətlər", href: "#muracietler" },
                ].map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                    style={{
                      padding: "16px 0", borderBottom: "1px solid var(--border)",
                      color: "var(--text)", textDecoration: "none", fontSize: 13,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}
                    className="hover-gold"
                  >
                    {item.label}
                    <span style={{ color: "var(--gold)", fontSize: 10 }}>→</span>
                  </a>
                ))}

                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
                  <a href={whatsapp} target="_blank" className="btn-gold" style={{ justifyContent: "center" }}>WhatsApp</a>
                  <a href={telegram} target="_blank" className="btn-outline" style={{ justifyContent: "center" }}>Telegram</a>
                </div>
              </nav>

              <div style={{ position: "absolute", bottom: 40, left: 32 }}>
                <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em" }}>İş saatı: 09:00 – 19:00</p>
                <p style={{ fontSize: 11, color: "var(--gold)", marginTop: 4, letterSpacing: "0.05em" }}>+994 55 413 16 58</p>
              </div>
            </aside>
          </div>
        )}

        {/* HERO */}
        <section style={{ paddingTop: 140, paddingBottom: 120, paddingLeft: 32, paddingRight: 32, maxWidth: 1200, margin: "0 auto" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="fade-up fade-up-1" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span className="gold-line"></span>
                <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase" }}>Premium mebel həlləri</span>
              </div>

              <h1 className="display fade-up fade-up-2" style={{ fontSize: "clamp(52px, 6vw, 80px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "0.02em", marginBottom: 28, color: "var(--text)" }}>
                Evinizə uyğun<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>ölçüdə</em> mebel
              </h1>

              <p className="fade-up fade-up-3" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 40, maxWidth: 420 }}>
                Mətbəx, qarderob, TV stend, yataq otağı — fərdi ölçü ilə hazırlanmış premium mebel sifarişləri.
              </p>

              <div className="hero-btns fade-up fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={whatsapp} target="_blank" className="btn-gold">WhatsApp</a>
                <a href={telegram} target="_blank" className="btn-outline">Telegram</a>
                <button onClick={() => setAiOpen(true)} className="btn-outline">AI ilə yaz</button>
              </div>
            </div>

            <div className="fade-up fade-up-2" style={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}>
              <img
                src={katalog[0].sekil}
                alt="Supellex Baku"
                style={{ width: "100%", height: 520, objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", bottom: 24, left: 24, right: 24,
                background: "rgba(8,8,8,0.75)", backdropFilter: "blur(12px)",
                border: "1px solid var(--border)", borderRadius: 2, padding: "16px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--gold)", textTransform: "uppercase" }}>Fərdi istehsal</p>
                  <p style={{ fontSize: 13, color: "var(--text)", marginTop: 2 }}>Hər ölçü qəbul edilir</p>
                </div>
                <span style={{ color: "var(--gold)", fontSize: 20 }}>✦</span>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ maxWidth: 1200, margin: "0 auto 100px", padding: "0 32px" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}></div>
        </div>

        {/* KATALOG */}
        <section id="katalog" style={{ padding: "0 32px 120px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span className="gold-line"></span>
                <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase" }}>Kolleksiya</span>
              </div>
              <h2 className="display" style={{ fontSize: 44, fontWeight: 300, letterSpacing: "0.04em" }}>Kataloq</h2>
            </div>
          </div>

          <div className="katalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {katalog.map((item, i) => (
              <div key={item.id} className="card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ overflow: "hidden" }}>
                  <img
                    src={item.sekil}
                    alt={item.ad}
                    style={{ width: "100%", height: 300, objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ padding: "24px 24px 28px" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>{item.kateqoriya}</p>
                  <h3 className="display" style={{ fontSize: 26, fontWeight: 400, marginBottom: 8 }}>{item.ad}</h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>{item.qiymet}</p>
                  <a
                    href={`${whatsapp}?text=Salam, ${item.ad} haqqında məlumat istəyirəm.`}
                    target="_blank"
                    className="btn-gold"
                    style={{ fontSize: 11 }}
                  >
                    Məlumat al
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ maxWidth: 1200, margin: "0 auto 100px", padding: "0 32px" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}></div>
        </div>

        {/* MÜRACİƏTLƏR */}
        <section id="muracietler" style={{ padding: "0 32px 140px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span className="gold-line"></span>
              <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase" }}>Əlaqə və müraciət</span>
            </div>
            <h2 className="display" style={{ fontSize: 44, fontWeight: 300, letterSpacing: "0.04em" }}>Müraciətlər</h2>
          </div>

          <div className="muraciet-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {muracietler.map((item) => (
              <div key={item.id} className="card" style={{ padding: "32px 28px" }}>
                <h3 className="display" style={{ fontSize: 24, fontWeight: 400, marginBottom: 12 }}>{item.ad}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 28 }}>{item.metn}</p>
                <a
                  href={`${whatsapp}?text=${item.mesaj}`}
                  target="_blank"
                  className="btn-outline"
                  style={{ fontSize: 11, padding: "10px 20px" }}
                >
                  Göndər →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 32px", maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p className="display" style={{ fontSize: 18, letterSpacing: "0.15em" }}>SUPELLEX BAKU</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6, letterSpacing: "0.05em" }}>Bakı, Binəqədi, 20-ci mədən, 1-ci korpus</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 13, color: "var(--gold)" }}>+994 55 413 16 58</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>09:00 – 19:00</p>
            </div>
          </div>
        </footer>

        {/* AI FAB */}
        <button
          onClick={() => setAiOpen(true)}
          style={{
            position: "fixed", bottom: 32, right: 32, zIndex: 40,
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--gold)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseOver={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,168,76,0.5)"; }}
          onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.35)"; }}
        >
          🤖
        </button>

        {/* AI MODAL */}
        {aiOpen && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            padding: 16, zIndex: 70, animation: "fadeIn 0.2s ease"
          }}>
            <div style={{
              width: "100%", maxWidth: 440,
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 4, overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)"
            }}>
              {/* Header */}
              <div style={{
                padding: "20px 24px", borderBottom: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "var(--surface2)"
              }}>
                <div>
                  <p className="display" style={{ fontSize: 18, fontWeight: 400, letterSpacing: "0.08em" }}>Supellex AI</p>
                  <p style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>Köməkçi · Online</p>
                </div>
                <button onClick={() => setAiOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 18 }}>✕</button>
              </div>

              {/* Messages */}
              <div className="scrollbar-hide" style={{ height: 320, overflowY: "auto", padding: "20px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 2,
                      fontSize: 13,
                      lineHeight: 1.6,
                      maxWidth: "85%",
                      alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                      background: msg.role === "user"
                        ? "var(--gold)"
                        : "var(--surface2)",
                      color: msg.role === "user" ? "#080808" : "var(--text)",
                      border: msg.role === "user" ? "none" : "1px solid var(--border)",
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && (
                  <div style={{
                    padding: "12px 16px", borderRadius: 2, fontSize: 13,
                    background: "var(--surface2)", border: "1px solid var(--border)",
                    color: "var(--gold)", alignSelf: "flex-start", letterSpacing: "0.1em"
                  }}>
                    ···
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{
                padding: "16px 20px", borderTop: "1px solid var(--border)",
                display: "flex", gap: 10, background: "var(--surface2)"
              }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendAiMessage()}
                  placeholder="Mesaj yazın..."
                  style={{
                    flex: 1, padding: "12px 16px",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: 2, color: "var(--text)", fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                />
                <button
                  onClick={sendAiMessage}
                  disabled={loading}
                  className="btn-gold"
                  style={{ padding: "12px 20px", fontSize: 12, opacity: loading ? 0.5 : 1 }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
