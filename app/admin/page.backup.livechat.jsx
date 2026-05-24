"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev";

export default function AdminPage() {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});

  async function loadMessages() {
    const res = await fetch(`${API_URL}/support/messages`, {
      cache: "no-store",
    });
    const data = await res.json();
    setMessages(data.messages || []);
  }

  async function sendReply(id) {
    const reply = replies[id];

    if (!reply || !reply.trim()) {
      alert("Cavab boş ola bilməz.");
      return;
    }

    const res = await fetch(`${API_URL}/support/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, reply }),
    });

    const data = await res.json();
    alert(data.reply || data.error);

    setReplies((prev) => ({ ...prev, [id]: "" }));
    loadMessages();
  }

  useEffect(() => {
    loadMessages();
    const timer = setInterval(loadMessages, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "white", padding: 20 }}>
      <h1 style={{ color: "#C9A84C", marginBottom: 20 }}>Supellex Canlı Dəstək Admin</h1>

      {messages.length === 0 && <p>Hələ mesaj yoxdur.</p>}

      <div style={{ display: "grid", gap: 16 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: 12,
              padding: 16,
              background: "#111",
            }}
          >
            <p><b>ID:</b> {msg.id}</p>
            <p><b>Ad:</b> {msg.name || "Yazılmayıb"}</p>
            <p><b>Telefon:</b> {msg.phone || "Yazılmayıb"}</p>
            <p><b>Mesaj:</b> {msg.message}</p>
            <p><b>Status:</b> {msg.status}</p>

            {msg.reply && (
              <div style={{ marginTop: 12, padding: 12, background: "#1c1c1c", borderRadius: 8 }}>
                <b>Sizin cavabınız:</b>
                <p>{msg.reply}</p>
              </div>
            )}

            <textarea
              placeholder="Müştəriyə cavab yazın..."
              value={replies[msg.id] || ""}
              onChange={(e) =>
                setReplies((prev) => ({ ...prev, [msg.id]: e.target.value }))
              }
              style={{
                width: "100%",
                minHeight: 90,
                marginTop: 12,
                padding: 12,
                borderRadius: 8,
                background: "#080808",
                color: "white",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            />

            <button
              onClick={() => sendReply(msg.id)}
              style={{
                marginTop: 10,
                padding: "12px 18px",
                borderRadius: 8,
                border: "none",
                background: "#C9A84C",
                color: "#080808",
                fontWeight: 700,
              }}
            >
              Cavabı göndər
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
