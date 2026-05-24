"use client";

import { useEffect, useState } from "react";

const API = "https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev";

export default function Page() {

  const [chatOpen, setChatOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    fetch(`${API}/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data || []);

        if (data && data.length > 0) {
          setSelectedCategory(data[0].key);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setLoadingProducts(true);

    fetch(`${API}/products/${selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data || []);
        setLoadingProducts(false);
      })
      .catch(() => {
        setProducts([]);
        setLoadingProducts(false);
      });
  }, [selectedCategory]);

  return (
    <div style={{
      minHeight:"100vh",
      background:"#050505",
      color:"#fff",
      paddingBottom:120
    }}>

      {/* HERO */}
      <div style={{
        padding:"24px 20px 10px"
      }}>
        <div style={{
          height:260,
          borderRadius:30,
          overflow:"hidden",
          position:"relative",
          background:"#111"
        }}>
          <img
            src={categories[0]?.image || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"}
            alt=""
            style={{
              width:"100%",
              height:"100%",
              objectFit:"cover"
            }}
          />

          <div style={{
            position:"absolute",
            inset:0,
            background:"linear-gradient(to top, rgba(0,0,0,.82), transparent)"
          }}/>

          <div style={{
            position:"absolute",
            left:20,
            bottom:20
          }}>
            <h1 style={{
              margin:0,
              fontSize:34
            }}>
              Supellex
            </h1>

            <p style={{
              opacity:.8,
              marginTop:8
            }}>
              Premium mebel kolleksiyası
            </p>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{
        padding:"6px 20px 10px",
        display:"flex",
        gap:10,
        overflowX:"auto"
      }}>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.key)}
            style={{
              whiteSpace:"nowrap",
              border:"1px solid rgba(255,255,255,0.10)",
              background:selectedCategory === c.key
                ? "linear-gradient(135deg,#D4AF37,#8f6f1e)"
                : "rgba(255,255,255,0.06)",
              color:selectedCategory === c.key ? "#000" : "#fff",
              padding:"10px 14px",
              borderRadius:18,
              fontWeight:"bold"
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{
        padding:"12px 20px"
      }}>

        {loadingProducts && (
          <p style={{opacity:.7}}>Məhsullar yüklənir...</p>
        )}

        {!loadingProducts && products.length === 0 && (
          <p style={{opacity:.7}}>Bu kateqoriyada məhsul yoxdur.</p>
        )}

        <div style={{
          display:"grid",
          gap:18
        }}>

          {products.map(p => (
            <div
              key={p.id}
              style={{
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:28,
                overflow:"hidden"
              }}
            >

              <img
                src={p.image}
                alt=""
                style={{
                  width:"100%",
                  height:240,
                  objectFit:"cover"
                }}
              />

              <div style={{
                padding:18
              }}>
                <h2 style={{
                  marginTop:0,
                  marginBottom:8
                }}>
                  {p.name}
                </h2>

                <div style={{
                  color:"#D4AF37",
                  fontWeight:"bold",
                  fontSize:24
                }}>
                  {p.price} AZN
                </div>

                <button
                  style={{
                    marginTop:16,
                    width:"100%",
                    border:"none",
                    borderRadius:18,
                    padding:"14px",
                    background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                    color:"#000",
                    fontWeight:"bold",
                    fontSize:16
                  }}
                >
                  Sifariş et
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ALT PANEL */}
      <div style={{
        position:"fixed",
        left:14,
        right:14,
        bottom:14,
        zIndex:9999,
        background:"rgba(10,10,10,0.88)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:28,
        padding:"14px 10px",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        backdropFilter:"blur(18px)"
      }}>

        <button style={navBtn}>
          ⌂
        </button>

        <button style={navBtn}>
          ◫
        </button>

        <button style={navBtn}>
          ❤
        </button>

        <button
          onClick={() => setChatOpen(true)}
          style={{
            ...navBtn,
            color:"#D4AF37"
          }}
        >
          ✦
        </button>

        <button
          onClick={() => setAuthOpen(true)}
          style={navBtn}
        >
          ☺
        </button>
      </div>

      {/* CHAT */}
      {chatOpen && (
        <div style={{
          position:"fixed",
          left:16,
          right:16,
          bottom:96,
          height:"70vh",
          background:"rgba(5,5,5,0.96)",
          border:"1px solid rgba(212,175,55,0.25)",
          borderRadius:28,
          zIndex:10000,
          overflow:"hidden",
          display:"flex",
          flexDirection:"column"
        }}>

          <div style={{
            padding:18,
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            borderBottom:"1px solid rgba(255,255,255,0.08)"
          }}>

            <div>
              <div style={{
                color:"#D4AF37",
                fontWeight:"bold",
                fontSize:22
              }}>
                Supellex AI
              </div>

              <div style={{
                color:"#22c55e",
                fontSize:13
              }}>
                ● Online
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
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
            padding:18,
            overflowY:"auto"
          }}>
            <div style={{
              background:"rgba(255,255,255,0.06)",
              padding:14,
              borderRadius:18,
              width:"fit-content",
              maxWidth:"80%"
            }}>
              Salam 👋 Sizə necə kömək edə bilərəm?
            </div>
          </div>

          <div style={{
            padding:14,
            borderTop:"1px solid rgba(255,255,255,0.08)",
            display:"flex",
            gap:10
          }}>
            <input
              placeholder="Mesaj yazın..."
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

      {/* PROFILE */}
      {authOpen && (
        <div style={{
          position:"fixed",
          inset:0,
          background:"rgba(0,0,0,.82)",
          zIndex:10001,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          padding:20
        }}>

          <div style={{
            width:"100%",
            maxWidth:380,
            background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:28,
            padding:24
          }}>

            <h2 style={{
              marginTop:0,
              color:"#D4AF37"
            }}>
              Hesaba giriş
            </h2>

            <input
              placeholder="Telefon"
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Şifrə"
              style={inputStyle}
            />

            <button
              style={{
                width:"100%",
                marginTop:14,
                border:"none",
                borderRadius:18,
                padding:"14px",
                background:"linear-gradient(135deg,#D4AF37,#8f6f1e)",
                color:"#000",
                fontWeight:"bold"
              }}
            >
              Daxil ol
            </button>

            <button
              onClick={() => setAuthOpen(false)}
              style={{
                width:"100%",
                marginTop:10,
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:18,
                padding:"14px",
                background:"transparent",
                color:"#fff"
              }}
            >
              Bağla
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

const navBtn = {
  background:"transparent",
  border:"none",
  color:"#fff",
  fontSize:24,
  cursor:"pointer"
};

const inputStyle = {
  width:"100%",
  background:"rgba(255,255,255,0.06)",
  border:"1px solid rgba(255,255,255,0.08)",
  borderRadius:18,
  padding:"14px",
  color:"#fff",
  marginTop:12
};
