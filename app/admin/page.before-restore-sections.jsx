"use client";

const premiumButton = {
  padding: "11px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(135deg,#D4AF37,#8f6f1e)",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer"
};

const ghostButton = {
  padding: "11px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

import { useEffect, useRef, useState } from "react";

const API = "https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [adminUser, setAdminUser] = useState("");

  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("metbex");
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [liveRooms, setLiveRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [liveMessages, setLiveMessages] = useState([]);
  const [replyText, setReplyText] = useState("");

  const [stats, setStats] = useState({
    products: 0,
    chats: 0
  });

  const [lastRoomCount, setLastRoomCount] = useState(0);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const lastMessageCountRef = useRef(0);
  const soundReadyRef = useRef(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    desc: "",
    category: "metbex",
    image: ""
  });

  const categories = [
    { name: "Mətbəx", key: "metbex" },
    { name: "Yataq otağı", key: "yataq" },
    { name: "Qonaq otağı", key: "qonaq" },
    { name: "Uşaq otağı", key: "usaq" },
    { name: "Ofis", key: "ofis" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("supellex_admin_token");
    const user = localStorage.getItem("supellex_admin_user");

    if (token) {
      setIsLoggedIn(true);
    }

    if (user) {
      setAdminUser(user);
    }
  }, []);

  async function adminLogin(e) {
    e.preventDefault();
    setLoginError("");

    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: adminPassword })
    });

    const data = await res.json();

    if (data.ok && data.token) {
      localStorage.setItem("supellex_admin_token", data.token);

      if (data.user) {
        localStorage.setItem("supellex_admin_user", data.user);
        setAdminUser(data.user);
      }

      setIsLoggedIn(true);
      setAdminPassword("");
    } else {
      setLoginError("Şifrə yanlışdır ❌");
    }
  }

  function adminLogout() {
    localStorage.removeItem("supellex_admin_token");
    localStorage.removeItem("supellex_admin_user");

    setAdminUser("");
    setIsLoggedIn(false);
  }

  function loadProducts(cat = category) {
    fetch(`${API}/products/${cat}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => alert("Məhsullar yüklənmədi ❌"));
  }

  useEffect(() => {
    loadProducts(category);
  }, [category]);

  useEffect(() => {
    setStats({
      products: products.length,
      chats: liveRooms.length
    });
  }, [products, liveRooms]);

  useEffect(() => {

    if ("Notification" in window) {
      Notification.requestPermission();
    }

    const t = setInterval(() => {

      fetch(`${API}/admin/live-chats`)
        .then(res => res.json())
        .then(data => {

          if (data.length > lastRoomCount && lastRoomCount !== 0) {

            try {

              if (soundReadyRef.current) {
                const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
                audio.play();
              }

              if (Notification.permission === "granted") {
                new Notification("🔔 Yeni müştəri mesajı", {
                  body: "Supellex canlı çatda yeni mesaj var"
                });
              }

            } catch (e) {}

          }

          setLastRoomCount(data.length);
          setLiveRooms(data);

        })
        .catch(() => {});

      if (selectedRoom) {
        fetch(`${API}/live-chat/messages/${selectedRoom.customer_id}`)
          .then(res => res.json())
          .then(data => setLiveMessages(data))
          .catch(() => {});
      }

    }, 1500);

    return () => clearInterval(t);

  }, [selectedRoom]);

  function enableNotificationSound() {
    try {
      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
      audio.play().then(() => {
        soundReadyRef.current = true;
        alert("Səs bildirişi aktiv oldu 🔔");
      }).catch(() => {
        alert("Chrome səsi blokladı. Səhifədə bir dəfə klik edib yenə yoxlayın.");
      });
    } catch (e) {}
  }

  async function sendReply() {

    if (!replyText.trim() || !selectedRoom) return;

    await fetch(`${API}/admin/live-chat/reply`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        customer_id:selectedRoom.customer_id,
        text:replyText
      })
    });

    setReplyText("");
  }

  async function closeChat() {

    if (!selectedRoom) return;

    await fetch(`${API}/admin/live-chat/close`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        customer_id:selectedRoom.customer_id
      })
    });

    setSelectedRoom(null);
    setLiveMessages([]);
  }

  async function uploadImage() {
    if (!file) return "";

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          const maxWidth = 1200;
          const scale = Math.min(1, maxWidth / img.width);

          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressed = canvas.toDataURL("image/jpeg", 0.75);
          resolve(compressed);
        };

        img.onerror = () => {
          alert("Şəkil emal olunmadı ❌");
          resolve("");
        };

        img.src = reader.result;
      };

      reader.onerror = () => {
        alert("Şəkil oxunmadı ❌");
        resolve("");
      };

      reader.readAsDataURL(file);
    });
  }

  async function addProduct(e) {
    e.preventDefault();

    if (savingProduct) return;

    setSavingProduct(true);
    setUploadProgress(15);

    const imageUrl = file ? await uploadImage() : form.image;

    setUploadProgress(65);

    if (!imageUrl) {
      alert("Şəkil seçilməyib ❌");
      setSavingProduct(false);
      setUploadProgress(0);
      return;
    }

    if (editId) {
      await fetch(`${API}/product/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
          category: form.category
        })
      });
    } else {
      await fetch(`${API}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
          category: form.category
        })
      });
    }

    setUploadProgress(90);

    setForm({
      name: "",
      price: "",
      desc: "",
      category: "metbex",
      image: ""
    });

    setFile(null);
    setEditId(null);
    setCategory(form.category);
    loadProducts(form.category);

    setUploadProgress(100);

    setTimeout(() => {
      setSavingProduct(false);
      setUploadProgress(0);
    }, 600);

    alert(editId ? "Məhsul yeniləndi ✅" : "Məhsul əlavə edildi ✅");
  }

  function startEditProduct(product) {
    setEditId(product.id);

    setForm({
      name: product.name || "",
      price: product.price || "",
      desc: product.desc || "",
      category: product.category || "metbex",
      image: product.image || ""
    });

    setFile(null);
    setCategory(product.category || "metbex");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function cancelEdit() {
    setEditId(null);
    setFile(null);

    setUploadProgress(90);

    setForm({
      name: "",
      price: "",
      desc: "",
      category: "metbex",
      image: ""
    });
  }

  async function deleteProduct(id) {
    await fetch(`${API}/product/${id}`, {
      method: "DELETE"
    });

    loadProducts(category);
  }

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#050505,#111827,#050505)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
      }}>
        <form onSubmit={adminLogin} style={{
          background: "rgba(255,255,255,0.06)",
          padding: 24,
          borderRadius: 16,
          width: "100%",
          maxWidth: 380,
          border: "1px solid #333"
        }}>
          <h1 style={{ color: "#D4AF37",
textShadow: "0 0 12px rgba(212,175,55,0.35)", marginBottom: 20 }}>
            Supellex Admin Giriş
          </h1>

          <input
            type="password"
            placeholder="Admin şifrəsi"
            value={adminPassword}
            onChange={e => setAdminPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              borderRadius: 8
            }}
          />

          {loginError && (
            <p style={{ color: "red" }}>{loginError}</p>
          )}

          <button type="submit" style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            background: "#C9A84C",
            color: "#000",
            fontWeight: "bold"
          }}>
            Daxil ol 🔐
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#050505,#111827,#050505)",
      color: "white",
      padding: 24
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ color: "#D4AF37",
textShadow: "0 0 12px rgba(212,175,55,0.35)" }}>Supellex Admin Panel</h1>

        <div style={{
          display:"flex",
          alignItems:"center",
          gap:12
        }}>

          <div style={{
            background:"rgba(255,255,255,0.08)",
            padding:"10px 14px",
            borderRadius:12,
            border:"1px solid rgba(255,255,255,0.08)",
            fontWeight:"bold"
          }}>
            🟢 {adminUser || "Admin"}
          </div>

          <button onClick={enableNotificationSound} style={premiumButton}>
            🔔 Səsi aktiv et
          </button>

          <button onClick={adminLogout} style={ghostButton}>
            Çıxış et
          </button>

        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 18,
        marginBottom: 24
      }}>

        <div style={{
          background:"rgba(255,255,255,0.07)",
          padding:20,
          borderRadius:22,
          border:"1px solid rgba(255,255,255,0.10)",
          boxShadow:"0 20px 60px rgba(0,0,0,0.35)"
        }}>
          <div style={{fontSize:14,opacity:.7}}>Ümumi məhsul</div>
          <div style={{
            fontSize:34,
            fontWeight:"bold",
            color:"#D4AF37",
            marginTop:10
          }}>
            📦 {stats.products}
          </div>
        </div>

        <div style={{
          background:"rgba(255,255,255,0.07)",
          padding:20,
          borderRadius:22,
          border:"1px solid rgba(255,255,255,0.10)",
          boxShadow:"0 20px 60px rgba(0,0,0,0.35)"
        }}>
          <div style={{fontSize:14,opacity:.7}}>Aktiv chat</div>
          <div style={{
            fontSize:34,
            fontWeight:"bold",
            color:"#D4AF37",
            marginTop:10
          }}>
            💬 {stats.chats}
          </div>
        </div>

        <div style={{
          background:"rgba(255,255,255,0.07)",
          padding:20,
          borderRadius:22,
          border:"1px solid rgba(255,255,255,0.10)",
          boxShadow:"0 20px 60px rgba(0,0,0,0.35)"
        }}>
          <div style={{fontSize:14,opacity:.7}}>Operator</div>
          <div style={{
            fontSize:30,
            fontWeight:"bold",
            color:"#22c55e",
            marginTop:10
          }}>
            🟢 Online
          </div>
        </div>

        <div style={{
          background:"rgba(255,255,255,0.07)",
          padding:20,
          borderRadius:22,
          border:"1px solid rgba(255,255,255,0.10)",
          boxShadow:"0 20px 60px rgba(0,0,0,0.35)"
        }}>
          <div style={{fontSize:14,opacity:.7}}>Server statusu</div>
          <div style={{
            fontSize:30,
            fontWeight:"bold",
            color:"#22c55e",
            marginTop:10
          }}>
            ⚡ Aktiv
          </div>
        </div>

      </div>

      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 30,
        background: "rgba(255,255,255,0.06)",
        padding: 12,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
      }}>
        {[
          { key: "products", label: "📦 Məhsullar" },
          { key: "chat", label: "💬 Müştəri Chat" },
          { key: "vacancy", label: "👥 Vakansiya" }
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            style={{
              padding: "12px 18px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: tab === item.key ? "linear-gradient(135deg,#D4AF37,#9b7a22)" : "rgba(255,255,255,0.05)",
              color: tab === item.key ? "#000" : "#fff",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <>
          <h2>{editId ? "Məhsulu redaktə et ✏️" : "Məhsul əlavə et"}</h2>

          <form onSubmit={addProduct} style={{
            display: "grid",
            gap: 10,
            maxWidth: 560,
            background: "rgba(255,255,255,0.07)",
            padding: 24,
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.45)",
            borderRadius: 20,
boxShadow: "0 0 25px rgba(0,0,0,0.35)",
backdropFilter: "blur(10px)"
          }}>
            <input
              placeholder="Məhsul adı"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              placeholder="Qiymət"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />

            <textarea
              placeholder="Açıqlama"
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
            />

            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {categories.map(c => (
                <option key={c.key} value={c.key}>{c.name}</option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files[0])}
            />

            {savingProduct && (
              <div style={{
                background:"rgba(255,255,255,0.08)",
                borderRadius:20,
                overflow:"hidden",
                height:14,
                border:"1px solid rgba(255,255,255,0.10)"
              }}>
                <div style={{
                  width:`${uploadProgress}%`,
                  height:"100%",
                  background:"linear-gradient(135deg,#D4AF37,#22c55e)",
                  transition:"width .4s ease"
                }} />
              </div>
            )}

            {savingProduct && (
              <p style={{color:"#D4AF37", fontWeight:"bold"}}>
                Şəkil və məhsul yüklənir... {uploadProgress}%
              </p>
            )}

            <button type="submit" style={{
              ...premiumButton,
              opacity: savingProduct ? .6 : 1,
              cursor: savingProduct ? "not-allowed" : "pointer"
            }} disabled={savingProduct}>
              {savingProduct ? "Gözləyin..." : editId ? "Yenilə ✅" : "Əlavə et ✅"}
            </button>

            {editId && (
              <button type="button" onClick={cancelEdit} style={ghostButton}>
                Ləğv et
              </button>
            )}
          </form>

          <h2 style={{ marginTop: 40 }}>Kateqoriya</h2>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c.key} onClick={() => setCategory(c.key)} style={category === c.key ? premiumButton : ghostButton}>
                {c.name}
              </button>
            ))}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
            gap: 20,
            marginTop: 20
          }}>
            {products.map(p => (
              <div key={p.id} style={{
                background: "rgba(255,255,255,0.06)",
                padding: 18,
border:"1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
boxShadow: "0 0 25px rgba(0,0,0,0.35)",
backdropFilter: "blur(10px)",
                border: "1px solid #333"
              }}>
                <img src={p.image} style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 10
                }} />

                <h3>{p.name}</h3>
                <p style={{ color: "#D4AF37",
textShadow: "0 0 12px rgba(212,175,55,0.35)" }}>{p.price} AZN</p>
                <p>{p.desc}</p>

                <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
                  <button onClick={() => startEditProduct(p)} style={premiumButton}>
                    Redaktə et ✏️
                  </button>

                  <button onClick={() => deleteProduct(p.id)} style={ghostButton}>
                    Sil 🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "chat" && (
        <div style={{
          display:"grid",
          gridTemplateColumns:"340px 1fr",
          gap:20
        }}>

          <div style={{
            background:"#111",
            borderRadius:12,
            padding:15,
            height:"76vh",
            overflowY:"auto"
          }}>
            <h2>Canlı çatlar</h2>

            {liveRooms.map(r => (
              <div
                key={r.id}
                onClick={() => setSelectedRoom(r)}
                style={{
                  padding:12,
                  marginBottom:10,
                  background:selectedRoom?.id === r.id ? "#C9A84C" : "#222",
                  color:selectedRoom?.id === r.id ? "#000" : "#fff",
                  borderRadius:10,
                  cursor:"pointer"
                }}
              >
                {r.customer_id}
              </div>
            ))}
          </div>

          <div style={{
            background:"#111",
            borderRadius:12,
            padding:15,
            display:"flex",
            flexDirection:"column",
            height:"80vh"
          }}>

            <h2>Mesajlar</h2>

            <div style={{
              flex:1,
              overflowY:"auto",
              background:"rgba(0,0,0,0.35)",
              borderRadius:10,
              padding:10,
              marginBottom:10
            }}>

              {liveMessages.map(m => (
                <div
                  key={m.id}
                  style={{
                    marginBottom:10,
                    textAlign:
                      m.sender === "operator"
                      ? "right"
                      : "left"
                  }}
                >
                  <span style={{
                    display:"inline-block",
                    background:
                      m.sender === "operator"
                      ? "#C9A84C"
                      : "#222",
                    color:
                      m.sender === "operator"
                      ? "#000"
                      : "#fff",
                    padding:"8px 12px",
                    borderRadius:10
                  }}>
                    {m.text}
                  </span>
                </div>
              ))}

            </div>

            <div style={{
              display:"flex",
              gap:10
            }}>
              <input
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Cavab yaz..."
                style={{flex:1}}
              />

              <button onClick={sendReply} style={premiumButton}>
                Göndər
              </button>

              <button onClick={closeChat} style={ghostButton}>
                Çatı bağla
              </button>
            </div>

          </div>

        </div>
      )}

      {tab === "vacancy" && (
        <div style={{
          background: "rgba(255,255,255,0.06)",
          padding: 20,
          borderRadius: 20,
boxShadow: "0 0 25px rgba(0,0,0,0.35)",
backdropFilter: "blur(10px)"
        }}>
          <h2>Vakansiya bölməsi</h2>
          <p>Vakansiya müraciətləri üçün bölmə hazırdır.</p>
        </div>
      )}
    </div>
  );
}
