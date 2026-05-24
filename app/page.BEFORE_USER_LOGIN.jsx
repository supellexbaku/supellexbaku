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
  const [chatMode, setChatMode] = useState("ai");
  const operatorOnline = true;

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

    if (data.mode) {
      setChatMode(data.mode);
    }

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

  async function sendOperatorRequest() {
    setChatMode("operator");

    const text = "operator";

    const res = await fetch(`${API}/live-chat/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id: liveCustomerId,
        text
      })
    });

    const data = await res.json();

    if (data.mode) {
      setChatMode(data.mode);
    }

    if (data.messages) {
      setChatMessages(prev => [
        ...prev,
        ...data.messages.filter(m => m.sender !== "customer")
      ]);
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
      minHeight:"100vh",
      paddingBottom:90,
      overflowX:"hidden"
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
            Premium mebel dizaynı, modern interyer həlləri.
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

      


        {/* PREMIUM KATEQORİYALAR */}
        {!selected && (
          <div style={{ padding:"12px 16px 28px" }}>
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
              gap:14
            }}>
              {categories.map((c,i)=>(
                <div
                  key={i}
                  onClick={()=>setSelected(c.key)}
                  style={{
                    position:"relative",
                    height:210,
                    borderRadius:26,
                    overflow:"hidden",
                    cursor:"pointer",
                    background:`url(${c.img}) center/cover`,
                    border:"1px solid rgba(255,255,255,0.08)",
                    boxShadow:"0 20px 60px rgba(0,0,0,0.50)"
                  }}
                >
                  <div style={{
                    position:"absolute",
                    inset:0,
                    background:"linear-gradient(to top, rgba(0,0,0,0.90), rgba(0,0,0,0.18), transparent)"
                  }} />

                  <div style={{
                    position:"absolute",
                    left:14,
                    right:14,
                    bottom:14,
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between"
                  }}>
                    <div style={{
                      color:"#fff",
                      fontWeight:"bold",
                      fontSize:22,
                      textShadow:"0 4px 15px rgba(0,0,0,0.7)"
                    }}>
                      {c.name}
                    </div>

                    <div style={{
                      width:40,
                      height:40,
                      borderRadius:"50%",
                      background:"#D4AF37",
                      color:"#000",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      fontWeight:"bold"
                    }}>
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            gridAutoFlow:"column",
          gridAutoColumns:"minmax(155px,180px)",
          overflowX:"auto",
          gridTemplateColumns:"none",
            gap:20,
            marginTop:20
          }}>
            {products.map((p,i)=>(
              <div key={i} style={{
                background:"rgba(255,255,255,0.06)",
                padding:16,
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:28,
overflow:"hidden",
position:"relative",
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
        onClick={() => setChatOpen(true)}
        style={{
          position:"fixed",
          right:20,
          bottom:24,
          zIndex:9998,
          background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
          color:"#000",
          border:"none",
          borderRadius:50,
          padding:"15px 22px",
          fontWeight:"bold",
          boxShadow:"0 20px 60px rgba(212,175,55,0.35)",
          cursor:"pointer"
        }}
      >
        💬 Chat
      </button>

      {chatOpen && (
        <div style={{
          position:"fixed",
          left:16,
          right:16,
          bottom:92,
          height:"68vh",
          maxHeight:620,
          background:"rgba(5,5,5,0.94)",
          border:"1px solid rgba(212,175,55,0.35)",
          borderRadius:28,
          zIndex:9998,
          overflow:"hidden",
          boxShadow:"0 35px 100px rgba(0,0,0,0.75)",
          backdropFilter:"blur(20px)",
          display:"flex",
          flexDirection:"column"
        }}>

          <div style={{
            padding:16,
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            borderBottom:"1px solid rgba(255,255,255,0.08)"
          }}>
            <div style={{
              display:"flex",
              alignItems:"center",
              gap:12
            }}>
              <div style={{
                width:52,
                height:52,
                borderRadius:"50%",
                background:"linear-gradient(135deg,#D4AF37,#111)",
                border:"1px solid rgba(212,175,55,0.55)",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontSize:24
              }}>
                {chatMode === "operator" ? "👤" : "🤖"}
              </div>

              <div>
                <div style={{
                  color:"#D4AF37",
                  fontWeight:"bold",
                  fontSize:22
                }}>
                  {chatMode === "operator" ? "İlkin Operator" : "Supellex AI"}
                </div>

                <div style={{
                  color: chatMode === "operator" && !operatorOnline ? "#aaa" : "#22c55e",
                  fontSize:14
                }}>
                  {chatMode === "operator"
                    ? operatorOnline
                      ? "● Online"
                      : "● Offline · daxil olanda cavab verəcək"
                    : "● AI aktivdir"}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setChatOpen(false);
                setChatMode("ai");
              }}
              style={{
                background:"transparent",
                border:"none",
                color:"#D4AF37",
                fontSize:28,
                cursor:"pointer"
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            padding:"12px 16px",
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:10
          }}>
            {[
              {icon:"💬", top:"1250+", bot:"Söhbət"},
              {icon:"⭐", top:"4.9", bot:"Reytinq"},
              {icon:"⚡", top:"2 dəq", bot:"Cavab"}
            ].map((x,i)=>(
              <div key={i} style={{
                background:"rgba(255,255,255,0.07)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:18,
                padding:10,
                textAlign:"center"
              }}>
                <div>{x.icon}</div>
                <b>{x.top}</b>
                <div style={{opacity:.65,fontSize:12}}>{x.bot}</div>
              </div>
            ))}
          </div>

          <div style={{
            flex:1,
            overflowY:"auto",
            padding:"8px 16px 14px"
          }}>
            {chatMessages.length === 0 && (
              <div style={{
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.10)",
                padding:14,
                borderRadius:18,
                lineHeight:1.5
              }}>
                👋 Xoş gəlmisiniz! Supellex AI köməkçisidir. Sualınızı yazın.
              </div>
            )}

            {chatMessages.map((m,i) => (
              <div key={m.id || i} style={{
                marginBottom:10,
                textAlign:m.sender === "customer" ? "right" : "left"
              }}>
                <span style={{
                  display:"inline-block",
                  maxWidth:"82%",
                  background:m.sender === "customer"
                    ? "linear-gradient(135deg,#D4AF37,#8f6f1e)"
                    : "rgba(255,255,255,0.08)",
                  color:m.sender === "customer" ? "#000" : "#fff",
                  padding:"10px 13px",
                  borderRadius:18,
                  lineHeight:1.45,
                  border:"1px solid rgba(255,255,255,0.08)"
                }}>
                  {m.text}
                </span>

                {m.sender !== "customer" &&
                 m.text.toLowerCase().includes("operatora qoşul") && (
                  <div style={{marginTop:8}}>
                    <button
                      onClick={sendOperatorRequest}
                      style={{
                        background:"linear-gradient(135deg,#22c55e,#15803d)",
                        color:"#fff",
                        border:"none",
                        padding:"9px 13px",
                        borderRadius:14,
                        cursor:"pointer",
                        fontWeight:"bold"
                      }}
                    >
                      🟢 Operatora qoşul
                    </button>
                  </div>
                )}
              </div>
            ))}


          </div>

          <div style={{
            padding:12,
            borderTop:"1px solid rgba(255,255,255,0.08)",
            display:"flex",
            gap:8,
            background:"rgba(0,0,0,0.35)"
          }}>
            <input
              value={chatText}
              onChange={e => setChatText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") sendLiveMessage();
              }}
              placeholder="Mesajınızı yazın..."
              style={{
                flex:1,
                background:"rgba(255,255,255,0.08)",
                color:"#fff",
                border:"1px solid rgba(255,255,255,0.12)",
                borderRadius:18,
                padding:"12px 14px",
                outline:"none"
              }}
            />

            <button
              onClick={sendLiveMessage}
              style={{
                background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                color:"#000",
                border:"none",
                borderRadius:18,
                padding:"0 16px",
                fontSize:20,
                fontWeight:"bold"
              }}
            >
              ➤
            </button>
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
            borderRadius:28,
overflow:"hidden",
position:"relative",
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
