"use client";

import { useState, useEffect } from "react";


// 🔥 ƏN VACİB — PUBLIC BACKEND
const API = "https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev";

export default function Home() {

  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [liveCustomerId] = useState(() => "cust_" + Date.now());
  const [chatOpen, setChatOpen] = useState(false);
  const [chatText, setChatText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const [orderProduct, setOrderProduct] = useState(null);
  const [vacancyOpen, setVacancyOpen] = useState(false);
  const [siteNotice, setSiteNotice] = useState("");
  const [orderForm, setOrderForm] = useState({
    customer_name: "",
    phone: "",
    note: ""
  });

  const [vacancyForm, setVacancyForm] = useState({
    fullname: "",
    phone: "",
    position: "",
    experience: "",
    note: ""
  });

  const categories = [
    { name: "Mətbəx", key: "metbex", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { name: "Yataq otağı", key: "yataq", img: "https://images.unsplash.com/photo-1615874959474-d609969a20ed" },
    { name: "Qonaq otağı", key: "qonaq", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
    { name: "Uşaq otağı", key: "usaq", img: "https://images.unsplash.com/photo-1616627982845-4c0e9e76c2f7" },
    { name: "Ofis", key: "ofis", img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7" }
  ];

  useEffect(() => {
    const t = setInterval(() => {
      fetch(`${API}/live-chat/messages/${liveCustomerId}`)
        .then(res => res.json())
        .then(data => { if (data && data.length > 0) setChatMessages(data); })
        .catch(() => {});
    }, 1500);

    return () => clearInterval(t);
  }, [liveCustomerId]);

  async function sendLiveMessage() {
    if (!chatText.trim()) return;

    const currentText = chatText;

    setChatMessages(prev => [
      ...prev,
      { sender: "customer", text: currentText }
    ]);

    setChatText("");

    const res = await fetch(`${API}/live-chat/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id: liveCustomerId,
        text: currentText
      })
    });

    const data = await res.json();

    if (data.messages) {
      setChatMessages(prev => [
        ...prev,
        ...data.messages.filter(m => m.sender !== "customer")
      ]);
    } else {
      fetch(`${API}/live-chat/messages/${liveCustomerId}`)
        .then(res => res.json())
        .then(data => { if (data && data.length > 0) setChatMessages(data); })
        .catch(() => {});
    }
  }

  async function sendVacancy(e) {
    e.preventDefault();

    const res = await fetch(`${API}/vacancy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vacancyForm)
    });

    const data = await res.json();

    if (data.ok) {
      setSiteNotice("Vakansiya müraciətiniz göndərildi ✅");
      setTimeout(() => setSiteNotice(""), 3500);

      setVacancyForm({
        fullname: "",
        phone: "",
        position: "",
        experience: "",
        note: ""
      });
    } else {
      setSiteNotice("Müraciət göndərilmədi ❌");
      setTimeout(() => setSiteNotice(""), 3500);
    }
  }

  async function sendOrder(e) {
    e.preventDefault();

    if (!orderProduct) return;

    const res = await fetch(`${API}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: orderProduct.name,
        customer_name: orderForm.customer_name,
        phone: orderForm.phone,
        note: orderForm.note
      })
    });

    const data = await res.json();

    if (data.ok) {
      setSiteNotice("Sifarişiniz göndərildi ✅");
      setTimeout(() => setSiteNotice(""), 3500);
      setOrderProduct(null);
      setOrderForm({
        customer_name: "",
        phone: "",
        note: ""
      });
    } else {
      setSiteNotice("Sifariş göndərilmədi ❌");
      setTimeout(() => setSiteNotice(""), 3500);
    }
  }

  useEffect(() => {
    if (!selected) return;

    setLoading(true);

    fetch(`${API}/products/${selected}`)
      .then(res => res.json())
      .then(data => {
        console.log("GƏLƏN DATA:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSiteNotice("Serverə qoşulmaq olmadı ❌");
        setTimeout(() => setSiteNotice(""), 3500);
      });

  }, [selected]);

  return (
    <div style={{
      background:"linear-gradient(135deg,#050505,#111827,#050505)",
      color:"#fff",
      minHeight:"100vh"
    }}>

      {siteNotice && (
        <div style={{
          position:"fixed",
          top:20,
          left:"50%",
          transform:"translateX(-50%)",
          background:"rgba(17,17,17,0.92)",
          color:"#fff",
          border:"1px solid rgba(212,175,55,0.35)",
          borderRadius:18,
          padding:"14px 22px",
          zIndex:10000,
          boxShadow:"0 20px 70px rgba(0,0,0,0.45)",
          backdropFilter:"blur(16px)",
          fontWeight:"bold"
        }}>
          {siteNotice}
        </div>
      )}

      {/* HEADER */}
      <div style={{
        padding:"40px 30px 20px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexWrap:"wrap",
        gap:20
      }}>

        <div style={{
          background:"radial-gradient(circle at top left, rgba(212,175,55,0.18), transparent 35%)",
          padding:24,
          borderRadius:30,
          border:"1px solid rgba(255,255,255,0.08)",
          boxShadow:"0 30px 90px rgba(0,0,0,0.45)",
          backdropFilter:"blur(14px)"
        }}>
          <h1 style={{
            fontSize:"clamp(38px,7vw,76px)",
            margin:0,
            color:"#D4AF37",
            textShadow:"0 0 40px rgba(212,175,55,0.55)",
            letterSpacing:"-2px"
          }}>
            Supellex Baku
          </h1>

          <p style={{
            opacity:.8,
            maxWidth:700,
            fontSize:18,
            marginTop:14,
            lineHeight:1.6
          }}>
            Premium mebel dizaynı, modern interyer həlləri və AI dəstəyi ilə yeni nəsil mebel təcrübəsi.
          </p>
        </div>

        <div style={{
          display:"flex",
          gap:12,
          flexWrap:"wrap"
        }}>
          <a
            href="https://wa.me/994554131658"
            target="_blank"
            style={{
              background:"linear-gradient(135deg,#25D366,#128C7E)",
              color:"#fff",
              padding:"14px 20px",
              borderRadius:16,
              textDecoration:"none",
              fontWeight:"bold",
              boxShadow:"0 15px 40px rgba(37,211,102,0.25)"
            }}
          >
            WhatsApp
          </a>

          <a
            href="https://t.me/supellex_baku_bot"
            target="_blank"
            style={{
              background:"linear-gradient(135deg,#229ED9,#126e96)",
              color:"#fff",
              padding:"14px 20px",
              borderRadius:16,
              textDecoration:"none",
              fontWeight:"bold",
              boxShadow:"0 15px 40px rgba(34,158,217,0.25)"
            }}
          >
            Telegram
          </a>
        </div>

      </div>

      {!selected && (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
          gap:18,
          padding:"10px 40px 20px"
        }}>

          {[
            { icon:"🪵", title:"Fərdi ölçü", text:"Məkanınıza uyğun ölçüdə mebel hazırlanması" },
            { icon:"🚚", title:"Çatdırılma", text:"Bakı daxilində rahat çatdırılma xidməti" },
            { icon:"🛠", title:"Quraşdırma", text:"Peşəkar usta komandası ilə quraşdırma" },
            { icon:"💬", title:"Canlı dəstək", text:"AI və operator dəstəyi ilə sürətli cavab" }
          ].map((item, i) => (
            <div key={i} style={{
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:24,
              padding:22,
              boxShadow:"0 20px 60px rgba(0,0,0,0.35)",
              backdropFilter:"blur(14px)"
            }}>
              <div style={{fontSize:32}}>{item.icon}</div>
              <h3 style={{color:"#D4AF37", marginBottom:8}}>{item.title}</h3>
              <p style={{opacity:.75, lineHeight:1.5}}>{item.text}</p>
            </div>
          ))}

        </div>
      )}

      {/* KATEQORİYALAR */}
      {!selected && (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
          gap:20,
          padding:40
        }}>
          {categories.map((c,i)=>(
            <div key={i}
              onClick={()=>setSelected(c.key)}
              style={{
                height:250,
                background:`url(${c.img}) center/cover`,
                borderRadius:28,
                overflow:"hidden",
                border:"1px solid rgba(255,255,255,0.08)",
                boxShadow:"0 25px 70px rgba(0,0,0,0.45)",
                transition:"0.35s",
                display:"flex",
                alignItems:"end",
                padding:20,
                cursor:"pointer"
              }}>
              <h2 style={{
                background:"rgba(0,0,0,0.45)",
                backdropFilter:"blur(10px)",
                padding:"5px 10px",
                borderRadius:6
              }}>
                {c.name}
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* MƏHSULLAR */}
      {selected && (
        <div style={{padding:40}}>

          <button onClick={()=>setSelected(null)}>
            ← Geri
          </button>

          <h2 style={{color:"#C9A84C"}}>
            {selected} məhsulları
          </h2>

          {loading && (
            <p>Məhsullar yüklənir...</p>
          )}

          {!loading && products.length === 0 && (
            <p>Heç bir məhsul tapılmadı ❗</p>
          )}

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
            gap:20,
            marginTop:20
          }}>
            {products.map((p,i)=>(
              <div key={i} style={{
                background:"rgba(255,255,255,0.06)",
                padding:16,
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:24,
                backdropFilter:"blur(14px)",
                boxShadow:"0 20px 60px rgba(0,0,0,0.40)",
                transition:"0.35s"
              }}>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name || "Supellex məhsul"}
                    onClick={() => setPreview(p.image)}
                    style={{
                      width:"100%",
                      borderRadius:10,
                      cursor:"pointer"
                    }}
                  />
                )}

                <h3 style={{marginTop:10}}>
                  {p.name}
                </h3>

                <p style={{
                  color:"#D4AF37",
                  fontWeight:"bold",
                  fontSize:18
                }}>
                  {p.price} AZN
                </p>

                {p.desc && (
                  <p style={{
                    opacity:.75,
                    lineHeight:1.5,
                    fontSize:14
                  }}>
                    {p.desc}
                  </p>
                )}

                <button
                  onClick={() => setOrderProduct(p)}
                  style={{
                    display:"inline-block",
                    marginTop:10,
                    background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                    color:"#000",
                    padding:"10px 14px",
                    borderRadius:14,
                    border:"none",
                    fontWeight:"bold",
                    cursor:"pointer"
                  }}
                >
                  Sifariş et
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          position:"fixed",
          right:20,
          bottom:20,
          zIndex:9998,
          background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
          color:"#000",
          border:"none",
          borderRadius:50,
          padding:"14px 18px",
          fontWeight:"bold"
        }}
      >
        Chat 💬
      </button>

      {chatOpen && (
        <div style={{
          position:"fixed",
          right:20,
          bottom:80,
          width:320,
          maxWidth:"90vw",
          background:"rgba(255,255,255,0.08)",
          border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:16,
          zIndex:9998,
          padding:15
        }}>
          <h3 style={{color:"#C9A84C"}}>Supellex Chat</h3>

          <div style={{
            height:260,
            overflowY:"auto",
            background:"rgba(0,0,0,0.35)",
            padding:10,
            borderRadius:10,
            marginBottom:10
          }}>
            {chatMessages.map((m,i) => (
              <div key={m.id || i} style={{
                marginBottom:8,
                textAlign:m.sender === "customer" ? "right" : "left"
              }}>
                <div>
                  <span style={{
                    display:"inline-block",
                    background:m.sender === "customer" ? "#C9A84C" : "#222",
                    color:m.sender === "customer" ? "#000" : "#fff",
                    padding:"7px 10px",
                    borderRadius:10
                  }}>
                    {m.text}
                  </span>

                  {m.sender !== "customer" &&
                   (m.text.includes("055") ||
                    m.text.includes("+994") ||
                    m.text.toLowerCase().includes("operator")) && (
                    <div style={{marginTop:8}}>
                      <button
                        onClick={() => {
                          setChatText("operator");
                          setTimeout(() => {
                            sendLiveMessage();
                          }, 100);
                        }}
                        style={{
                          background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                          color:"#000",
                          border:"none",
                          padding:"8px 12px",
                          borderRadius:8,
                          cursor:"pointer",
                          fontWeight:"bold"
                        }}
                      >
                        🟢 Operatora qoşul
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{display:"flex", gap:6}}>
            <input
              value={chatText}
              onChange={e => setChatText(e.target.value)}
              placeholder="Mesaj yazın..."
              style={{flex:1}}
            />
            <button onClick={sendLiveMessage}>Göndər</button>
          </div>
        </div>
      )}

      {!selected && (
        <div style={{
          padding:"0 40px 50px",
          display:"flex",
          justifyContent:"center"
        }}>
          <button
            onClick={() => setVacancyOpen(true)}
            style={{
              background:"rgba(255,255,255,0.08)",
              border:"1px solid rgba(255,255,255,0.12)",
              color:"#fff",
              padding:"16px 24px",
              borderRadius:20,
              fontWeight:"bold",
              cursor:"pointer",
              boxShadow:"0 20px 60px rgba(0,0,0,0.35)",
              backdropFilter:"blur(14px)"
            }}
          >
            👷 Vakansiya üçün müraciət et
          </button>
        </div>
      )}

      {vacancyOpen && (
        <div style={{
          position:"fixed",
          inset:0,
          background:"rgba(0,0,0,0.78)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          zIndex:9999,
          padding:20
        }}>
          <div style={{
            width:"100%",
            maxWidth:520,
            background:"rgba(255,255,255,0.10)",
            border:"1px solid rgba(255,255,255,0.12)",
            borderRadius:28,
            padding:24,
            backdropFilter:"blur(18px)",
            boxShadow:"0 30px 80px rgba(0,0,0,0.55)"
          }}>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              gap:12
            }}>
              <h2 style={{color:"#D4AF37", margin:0}}>
                Vakansiya müraciəti 👷
              </h2>

              <button
                onClick={() => setVacancyOpen(false)}
                style={{
                  background:"rgba(255,255,255,0.08)",
                  color:"#fff",
                  border:"1px solid rgba(255,255,255,0.12)",
                  borderRadius:12,
                  padding:"8px 12px",
                  cursor:"pointer"
                }}
              >
                ✕
              </button>
            </div>

            <p style={{opacity:.75, lineHeight:1.6}}>
              Komandamıza qoşulmaq üçün məlumatlarınızı göndərin.
            </p>

            <form onSubmit={sendVacancy} style={{
              display:"grid",
              gap:12,
              marginTop:18
            }}>
              <input required placeholder="Ad Soyad" value={vacancyForm.fullname}
                onChange={e => setVacancyForm({...vacancyForm, fullname:e.target.value})}
                style={{padding:12, borderRadius:12}} />

              <input required placeholder="Telefon" value={vacancyForm.phone}
                onChange={e => setVacancyForm({...vacancyForm, phone:e.target.value})}
                style={{padding:12, borderRadius:12}} />

              <input required placeholder="Vəzifə / Sahə" value={vacancyForm.position}
                onChange={e => setVacancyForm({...vacancyForm, position:e.target.value})}
                style={{padding:12, borderRadius:12}} />

              <input placeholder="Təcrübə" value={vacancyForm.experience}
                onChange={e => setVacancyForm({...vacancyForm, experience:e.target.value})}
                style={{padding:12, borderRadius:12}} />

              <textarea placeholder="Qeyd" value={vacancyForm.note}
                onChange={e => setVacancyForm({...vacancyForm, note:e.target.value})}
                style={{padding:12, borderRadius:12, minHeight:90}} />

              <button type="submit" style={{
                background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                color:"#000",
                border:"none",
                padding:14,
                borderRadius:16,
                fontWeight:"bold",
                cursor:"pointer"
              }}>
                Müraciət göndər ✅
              </button>
            </form>
          </div>
        </div>
      )}

      {orderProduct && (
        <div style={{
          position:"fixed",
          inset:0,
          background:"rgba(0,0,0,0.78)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          zIndex:9999,
          padding:20
        }}>
          <form onSubmit={sendOrder} style={{
            width:"100%",
            maxWidth:420,
            background:"rgba(255,255,255,0.10)",
            border:"1px solid rgba(255,255,255,0.12)",
            borderRadius:24,
            padding:24,
            backdropFilter:"blur(18px)",
            boxShadow:"0 30px 80px rgba(0,0,0,0.55)"
          }}>
            <h2 style={{color:"#D4AF37", marginTop:0}}>
              Sifariş formu
            </h2>

            <p style={{opacity:.8}}>
              Məhsul: <b>{orderProduct.name}</b>
            </p>

            <input
              required
              placeholder="Adınız"
              value={orderForm.customer_name}
              onChange={e => setOrderForm({...orderForm, customer_name:e.target.value})}
              style={{
                width:"100%",
                padding:12,
                borderRadius:12,
                marginBottom:10
              }}
            />

            <input
              required
              placeholder="Telefon nömrəsi"
              value={orderForm.phone}
              onChange={e => setOrderForm({...orderForm, phone:e.target.value})}
              style={{
                width:"100%",
                padding:12,
                borderRadius:12,
                marginBottom:10
              }}
            />

            <textarea
              placeholder="Qeyd"
              value={orderForm.note}
              onChange={e => setOrderForm({...orderForm, note:e.target.value})}
              style={{
                width:"100%",
                padding:12,
                borderRadius:12,
                marginBottom:12,
                minHeight:80
              }}
            />

            <div style={{display:"flex", gap:10}}>
              <button type="submit" style={{
                flex:1,
                background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                color:"#000",
                border:"none",
                padding:12,
                borderRadius:14,
                fontWeight:"bold",
                cursor:"pointer"
              }}>
                Göndər ✅
              </button>

              <button type="button" onClick={() => setOrderProduct(null)} style={{
                flex:1,
                background:"rgba(255,255,255,0.08)",
                color:"#fff",
                border:"1px solid rgba(255,255,255,0.12)",
                padding:12,
                borderRadius:14,
                cursor:"pointer"
              }}>
                Bağla
              </button>
            </div>
          </form>
        </div>
      )}

      

      {preview && (
        <div
          onClick={() => setPreview(null)}
          style={{
            position:"fixed",
            inset:0,
            background:"#000d",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            zIndex:9999,
            padding:20
          }}
        >
          <img
            src={preview}
            style={{
              maxWidth:"95%",
              maxHeight:"95%",
              borderRadius:20
            }}
          />
        </div>
      )}

    </div>
  );
}