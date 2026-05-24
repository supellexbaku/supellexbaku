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

  const [isRegister, setIsRegister] = useState(false);

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderPhone, setOrderPhone] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);

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

  useEffect(() => {
    const saved = localStorage.getItem("supellex_user");

    if (saved) {
      try {
        setUser(JSON.parse(saved));
        setAuthOpen(false);
      } catch {
        setAuthOpen(true);
      }
    } else {
      setAuthOpen(true);
    }
  }, []);

  async function loginUser() {

    if (!phone || !password) {
      setAuthMessage("Telefon və şifrə daxil edin");
      return;
    }

    setAuthLoading(true);

    try {

      const res = await fetch(`${API}/user/login`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          phone,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthMessage(data.error || "Login xətası");
        setAuthLoading(false);
        return;
      }

      localStorage.setItem(
        "supellex_user",
        JSON.stringify(data.user)
      );

      setUser(data.user);
      setAuthMessage("");

      setAuthOpen(false);

      setPhone("");
      setPassword("");

    } catch {
      setAuthMessage("Server xətası");
    }

    setAuthLoading(false);
  }

  async function registerUser() {

    if (!fullname || !phone || !password) {
      setAuthMessage("Bütün xanaları doldurun");
      return;
    }

    setAuthLoading(true);

    try {

      const res = await fetch(`${API}/user/register`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          fullname,
          phone,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthMessage(data.error || "Qeydiyyat xətası");
        setAuthLoading(false);
        return;
      }

      setAuthMessage("Qeydiyyat uğurlu oldu ✅ İndi daxil olun");

      setIsRegister(false);

      setFullname("");
      setPassword("");

    } catch {
      setAuthMessage("Server xətası");
    }

    setAuthLoading(false);
  }

  function logoutUser() {
    localStorage.removeItem("supellex_user");
    setUser(null);
    setAuthOpen(true);
  }

  function openOrder(product) {
    if (!user) {
      setAuthOpen(true);
      setAuthMessage("Sifariş vermək üçün əvvəlcə daxil olun");
      return;
    }

    setSelectedProduct(product);
    setOrderPhone(user?.phone || "");
    setOrderNote("");
    setOrderMessage("");
    setOrderOpen(true);
  }

  async function sendOrder() {
    if (!selectedProduct) return;

    if (!orderPhone) {
      setOrderMessage("Telefon nömrəsi daxil edin");
      return;
    }

    setOrderLoading(true);
    setOrderMessage("");

    try {
      const res = await fetch(`${API}/order`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          product_name:selectedProduct.name,
          customer_name:user?.fullname || "",
          phone:orderPhone,
          note:orderNote
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setOrderMessage(data.error || "Sifariş göndərilmədi");
        setOrderLoading(false);
        return;
      }

      setOrderMessage("Sifariş göndərildi ✅ Admin panelə düşdü");

      setTimeout(() => {
        setOrderOpen(false);
        setSelectedProduct(null);
      }, 900);

    } catch {
      setOrderMessage("Server xətası");
    }

    setOrderLoading(false);
  }


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
                  onClick={() => openOrder(p)}
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


      {/* ORDER POPUP */}
      {orderOpen && selectedProduct && (
        <div style={{
          position:"fixed",
          inset:0,
          background:"rgba(0,0,0,.82)",
          zIndex:10002,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          padding:20
        }}>
          <div style={{
            width:"100%",
            maxWidth:390,
            background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:28,
            padding:24
          }}>
            <h2 style={{ marginTop:0, color:"#D4AF37" }}>
              Sifariş
            </h2>

            <div style={{
              background:"rgba(255,255,255,0.05)",
              padding:14,
              borderRadius:18,
              marginBottom:12
            }}>
              <b>{selectedProduct.name}</b>
              <div style={{ color:"#D4AF37", marginTop:6 }}>
                {selectedProduct.price} AZN
              </div>
            </div>

            <input
              value={orderPhone}
              onChange={(e)=>setOrderPhone(e.target.value)}
              placeholder="Telefon"
              style={inputStyle}
            />

            <textarea
              value={orderNote}
              onChange={(e)=>setOrderNote(e.target.value)}
              placeholder="Qeyd"
              style={{
                ...inputStyle,
                minHeight:90,
                resize:"none"
              }}
            />

            {orderMessage && (
              <div style={{
                marginTop:12,
                padding:12,
                borderRadius:14,
                background:"rgba(212,175,55,0.12)",
                border:"1px solid rgba(212,175,55,0.25)",
                color:"#D4AF37",
                fontSize:14
              }}>
                {orderMessage}
              </div>
            )}

            <button
              onClick={sendOrder}
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
              {orderLoading ? "Göndərilir..." : "Sifarişi göndər"}
            </button>

            <button
              onClick={() => setOrderOpen(false)}
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

            {!user ? (
              <>

                <h2 style={{
                  marginTop:0,
                  color:"#D4AF37"
                }}>
                  {isRegister ? "Qeydiyyat" : "Hesaba giriş"}
                </h2>

                {isRegister && (
                  <input
                    placeholder="Ad soyad"
                    value={fullname}
                    onChange={(e)=>setFullname(e.target.value)}
                    style={inputStyle}
                  />
                )}

                <input
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  style={inputStyle}
                />

                <input
                  type="password"
                  placeholder="Şifrə"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  style={inputStyle}
                />

                {authMessage && (
                  <div style={{
                    marginTop:12,
                    padding:12,
                    borderRadius:14,
                    background:"rgba(212,175,55,0.12)",
                    border:"1px solid rgba(212,175,55,0.25)",
                    color:"#D4AF37",
                    fontSize:14
                  }}>
                    {authMessage}
                  </div>
                )}

                <button
                  onClick={isRegister ? registerUser : loginUser}
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
                  {authLoading
                    ? "Yüklənir..."
                    : isRegister
                      ? "Qeydiyyatdan keç"
                      : "Daxil ol"}
                </button>

                <button
                  onClick={() => setIsRegister(!isRegister)}
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
                  {isRegister
                    ? "Giriş et"
                    : "Yeni hesab yarat"}
                </button>

              </>
            ) : (
              <>

                <h2 style={{
                  marginTop:0,
                  color:"#D4AF37"
                }}>
                  Profil
                </h2>

                <div style={{
                  marginTop:20,
                  background:"rgba(255,255,255,0.05)",
                  padding:18,
                  borderRadius:18
                }}>

                  <div style={{
                    fontSize:22,
                    fontWeight:"bold"
                  }}>
                    👤 {user.fullname}
                  </div>

                  <div style={{
                    marginTop:10,
                    opacity:.8
                  }}>
                    📞 {user.phone}
                  </div>

                </div>

                <button
                  onClick={logoutUser}
                  style={{
                    width:"100%",
                    marginTop:18,
                    border:"none",
                    borderRadius:18,
                    padding:"14px",
                    background:"#dc2626",
                    color:"#fff",
                    fontWeight:"bold"
                  }}
                >
                  Çıxış et
                </button>

              </>
            )}

            <button
              onClick={() => {
                if (!user) {
                  setAuthMessage("Davam etmək üçün hesaba daxil olun və ya qeydiyyatdan keçin");
                  return;
                }
                setAuthOpen(false);
              }}
              style={{
                width:"100%",
                marginTop:12,
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
