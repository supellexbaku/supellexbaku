"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev";

export default function MobileAdmin() {

  const [tab, setTab] = useState("chat");

  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  async function loadData() {

    try {

      const r1 = await fetch(`${API}/live-chat/rooms`);
      const d1 = await r1.json();
      setRooms(Array.isArray(d1) ? d1 : []);

      const r2 = await fetch(`${API}/orders`);
      const d2 = await r2.json();
      setOrders(Array.isArray(d2) ? d2 : []);

      const r3 = await fetch(`${API}/admin/users`);
      const d3 = await r3.json();
      setUsers(Array.isArray(d3) ? d3 : []);

    } catch {}

  }


  async function openRoom(room) {

    setSelectedRoom(room);

    try {

      const res = await fetch(
        `${API}/live-chat/messages/${room.customer_id}`
      );

      const data = await res.json();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.messages)
          ? data.messages
          : [];

      setMessages(list);

    } catch {}

  }

  async function sendReply() {

    if (!reply.trim() || !selectedRoom) return;

    try {

      await fetch(`${API}/live-chat/reply`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          customer_id:selectedRoom.customer_id,
          text:reply,
          sender:"İlkin Operator"
        })
      });

      setReply("");

      openRoom(selectedRoom);

    } catch {}

  }


  useEffect(() => {

    loadData();

    const t = setInterval(loadData, 4000);

    return () => clearInterval(t);

  }, []);

  const navBtn = (active) => ({
    flex:1,
    border:"none",
    background: active
      ? "linear-gradient(135deg,#D4AF37,#8f6f1e)"
      : "rgba(255,255,255,0.05)",
    color: active ? "#000" : "#fff",
    borderRadius:18,
    padding:"14px 10px",
    fontWeight:"bold"
  });

  return (
    <div style={{
      minHeight:"100vh",
      background:"#050505",
      color:"#fff",
      paddingBottom:90
    }}>


      {selectedRoom && (
        <div style={{
          position:"fixed",
          inset:0,
          background:"#050505",
          zIndex:9999,
          display:"flex",
          flexDirection:"column"
        }}>

          <div style={{
            padding:18,
            borderBottom:"1px solid rgba(255,255,255,0.08)",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>

            <div>
              <div style={{
                color:"#D4AF37",
                fontSize:22,
                fontWeight:"bold"
              }}>
                👤 {selectedRoom.fullname || "Müştəri"}
              </div>

              <div style={{
                marginTop:4,
                fontSize:13,
                color:"#22c55e"
              }}>
                ● Online chat
              </div>
            </div>

            <button
              onClick={() => setSelectedRoom(null)}
              style={{
                background:"transparent",
                border:"none",
                color:"#fff",
                fontSize:28
              }}
            >
              ×
            </button>

          </div>

          <div style={{
            flex:1,
            overflowY:"auto",
            padding:16,
            display:"grid",
            gap:10,
            alignContent:"start"
          }}>

            {messages.map((m, i) => {

              const mine =
                String(m.sender || "").includes("Operator") ||
                String(m.sender || "").includes("admin");

              return (
                <div
                  key={i}
                  style={{
                    justifySelf: mine ? "end" : "start",
                    background: mine
                      ? "linear-gradient(135deg,#D4AF37,#8f6f1e)"
                      : "rgba(255,255,255,0.06)",
                    color: mine ? "#000" : "#fff",
                    padding:14,
                    borderRadius:18,
                    maxWidth:"82%"
                  }}
                >
                  {m.text}
                </div>
              );
            })}

          </div>

          <div style={{
            padding:14,
            display:"flex",
            gap:10,
            borderTop:"1px solid rgba(255,255,255,0.08)"
          }}>

            <input
              value={reply}
              onChange={(e)=>setReply(e.target.value)}
              placeholder="Cavab yazın..."
              style={{
                flex:1,
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:18,
                padding:"14px",
                color:"#fff"
              }}
            />

            <button
              onClick={sendReply}
              style={{
                border:"none",
                borderRadius:18,
                padding:"0 18px",
                background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                color:"#000",
                fontWeight:"bold"
              }}
            >
              ➤
            </button>

          </div>

        </div>
      )}


      <div style={{
        padding:20,
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        position:"sticky",
        top:0,
        background:"rgba(5,5,5,.95)",
        backdropFilter:"blur(10px)",
        zIndex:50
      }}>

        <div style={{
          fontSize:26,
          fontWeight:"bold",
          color:"#D4AF37"
        }}>
          Supellex Mobile Admin
        </div>

        <div style={{
          marginTop:6,
          color:"#22c55e",
          fontSize:13
        }}>
          ● Online Operator
        </div>

      </div>

      <div style={{
        padding:16,
        display:"grid",
        gap:14
      }}>

        {tab === "chat" && rooms.map((r, i) => (
          <div
            key={i}
            onClick={() => openRoom(r)}
            style={{
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:24,
              padding:16
            }}
          >
            <div style={{
              fontWeight:"bold",
              fontSize:18
            }}>
              👤 {r.fullname || "Müştəri"}
            </div>

            <div style={{
              marginTop:8,
              opacity:.8
            }}>
              📞 {r.phone}
            </div>
          </div>
        ))}

        {tab === "orders" && orders.map((o, i) => (
          <div
            key={i}
            onClick={() => openRoom(r)}
            style={{
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:24,
              padding:16
            }}
          >
            <div style={{
              fontWeight:"bold",
              fontSize:18
            }}>
              🛒 {o.product_name}
            </div>

            <div style={{ marginTop:8 }}>
              👤 {o.customer_name}
            </div>

            <div style={{ marginTop:8 }}>
              📞 {o.phone}
            </div>
          </div>
        ))}

        {tab === "users" && users.map((u, i) => (
          <div
            key={i}
            onClick={() => openRoom(r)}
            style={{
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:24,
              padding:16
            }}
          >
            <div style={{
              fontWeight:"bold",
              fontSize:18
            }}>
              👤 {u.fullname}
            </div>

            <div style={{ marginTop:8 }}>
              📞 {u.phone}
            </div>
          </div>
        ))}

      </div>

      <div style={{
        position:"fixed",
        left:0,
        right:0,
        bottom:0,
        padding:12,
        background:"rgba(5,5,5,.96)",
        borderTop:"1px solid rgba(255,255,255,0.08)",
        display:"flex",
        gap:10
      }}>

        <button
          onClick={() => setTab("chat")}
          style={navBtn(tab === "chat")}
        >
          💬 Chat
        </button>

        <button
          onClick={() => setTab("orders")}
          style={navBtn(tab === "orders")}
        >
          🛒 Orders
        </button>

        <button
          onClick={() => setTab("users")}
          style={navBtn(tab === "users")}
        >
          👤 Users
        </button>

      </div>

    </div>
  );
}
