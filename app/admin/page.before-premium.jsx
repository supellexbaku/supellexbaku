"use client";

import { useEffect, useState } from "react";

const API = "https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("metbex");
  const [file, setFile] = useState(null);

  const [liveRooms, setLiveRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [liveMessages, setLiveMessages] = useState([]);
  const [replyText, setReplyText] = useState("");

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
    if (token) setIsLoggedIn(true);
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
      setIsLoggedIn(true);
      setAdminPassword("");
    } else {
      setLoginError("Şifrə yanlışdır ❌");
    }
  }

  function adminLogout() {
    localStorage.removeItem("supellex_admin_token");
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

    const t = setInterval(() => {

      fetch(`${API}/admin/live-chats`)
        .then(res => res.json())
        .then(data => setLiveRooms(data))
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
        resolve(reader.result);
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

    const imageUrl = await uploadImage();

    if (!imageUrl) {
      alert("Şəkil seçilməyib ❌");
      return;
    }

    await fetch(`${API}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        image: imageUrl,
        category: form.category
      })
    });

    setForm({
      name: "",
      price: "",
      desc: "",
      category: "metbex",
      image: ""
    });

    setFile(null);
    setCategory(form.category);
    loadProducts(form.category);

    alert("Məhsul əlavə edildi ✅");
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
        padding: 30
      }}>
        <form onSubmit={adminLogin} style={{
          background: "rgba(255,255,255,0.06)",
          padding: 30,
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
      padding: 30
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ color: "#D4AF37",
textShadow: "0 0 12px rgba(212,175,55,0.35)" }}>Supellex Admin Panel</h1>

        <button onClick={adminLogout}>
          Çıxış et
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
        <button onClick={() => setTab("products")}>Məhsullar</button>
        <button onClick={() => setTab("chat")}>Müştəri Chat</button>
        <button onClick={() => setTab("vacancy")}>Vakansiya</button>
      </div>

      {tab === "products" && (
        <>
          <h2>Məhsul əlavə et</h2>

          <form onSubmit={addProduct} style={{
            display: "grid",
            gap: 10,
            maxWidth: 500,
            background: "rgba(255,255,255,0.06)",
            padding: 20,
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

            <button type="submit">Əlavə et ✅</button>
          </form>

          <h2 style={{ marginTop: 40 }}>Kateqoriya</h2>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c.key} onClick={() => setCategory(c.key)}>
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

                <button onClick={() => deleteProduct(p.id)}>
                  Sil 🗑
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "chat" && (
        <div style={{
          display:"grid",
          gridTemplateColumns:"300px 1fr",
          gap:20
        }}>

          <div style={{
            background:"#111",
            borderRadius:12,
            padding:15,
            height:"80vh",
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

              <button onClick={sendReply}>
                Göndər
              </button>

              <button onClick={closeChat}>
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
