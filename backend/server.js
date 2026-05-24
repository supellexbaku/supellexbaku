require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const path = require("path");

const app = express();

// 🔥 CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json({ limit: "50mb" }));

// 📂 UPLOAD CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 📁 STATIC (çox vacib)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 💾 DB
const db = new sqlite3.Database("./data.db");

// 🔥 TABLES
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  image TEXT,
  category TEXT,
  price TEXT,
  desc TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  key TEXT UNIQUE,
  image TEXT
)`);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, key TEXT UNIQUE, image TEXT)"
  );

  db.run(
    "INSERT OR IGNORE INTO categories (name, key, image) VALUES (?, ?, ?)",
    ["Mətbəx", "metbex", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"]
  );

  db.run(
    "INSERT OR IGNORE INTO categories (name, key, image) VALUES (?, ?, ?)",
    ["Yataq otağı", "yataq", "https://images.unsplash.com/photo-1615874959474-d609969a20ed"]
  );

  db.run(
    "INSERT OR IGNORE INTO categories (name, key, image) VALUES (?, ?, ?)",
    ["Qonaq otağı", "qonaq", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"]
  );
});

db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_user TEXT,
  text TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullname TEXT,
  phone TEXT UNIQUE,
  password TEXT,
  created_at DATETIME DEFAULT (datetime('now', '+4 hours'))
)`);

db.run(`CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT,
  customer_name TEXT,
  phone TEXT,
  note TEXT,
  status TEXT DEFAULT 'new',
  created_at DATETIME DEFAULT (datetime('now', '+4 hours'))
)`);

db.run(`CREATE TABLE IF NOT EXISTS vacancies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullname TEXT,
  phone TEXT,
  position TEXT,
  experience TEXT,
  note TEXT,
  created_at DATETIME DEFAULT (datetime('now', '+4 hours'))
)`);

// 📸 UPLOAD ROUTE (ƏN VACİB)
app.post("/upload", upload.single("file"), (req, res) => {

  console.log("UPLOAD REQUEST GƏLDİ");

  if (!req.file) {
    return res.status(400).json({ error: "File yoxdur" });
  }

  const url = `https://friendly-palm-tree-4q7jrr4757v4h5j45-3000.app.github.dev/uploads/${req.file.filename}`;

  console.log("UPLOAD OK:", url);

  res.json({ url });
});

// 💬 CHAT
app.post("/chat", async (req, res) => {
  const { message, from_user } = req.body;

  db.run(
    "INSERT INTO messages (from_user, text) VALUES (?,?)",
    [from_user || "user", message]
  );

  try {
    const OpenAI = require("openai");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Sən Supellex Baku AI asistentsən. Mebel satışı üçün qısa və faydalı cavab ver.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices[0].message.content;

    db.run(
      "INSERT INTO messages (from_user, text) VALUES (?,?)",
      ["ai", reply]
    );

    res.json({ reply });

  } catch (err) {

    console.log(err);

    res.json({
      reply: "AI cavab verə bilmədi ❌",
    });

  }

});

// 📥 GET CHAT
app.get("/messages", (req, res) => {
  db.all("SELECT * FROM messages", (err, rows) => {
    res.json(rows);
  });
});

// 👤 USER REGISTER
app.post("/user/register", (req, res) => {
  const { fullname, phone, password } = req.body;

  if (!fullname || !phone || !password) {
    return res.status(400).json({
      ok: false,
      error: "Ad, telefon və şifrə lazımdır"
    });
  }

  db.run(
    "INSERT INTO users (fullname, phone, password) VALUES (?,?,?)",
    [fullname, phone, password],
    function(err) {
      if (err) {
        return res.status(400).json({
          ok: false,
          error: "Bu telefon artıq qeydiyyatdan keçib"
        });
      }

      res.json({
        ok: true,
        user: {
          id: this.lastID,
          fullname,
          phone
        }
      });
    }
  );
});

// 👤 USER LOGIN
app.post("/user/login", (req, res) => {
  const { phone, password } = req.body;

  db.get(
    "SELECT id, fullname, phone, created_at FROM users WHERE phone=? AND password=?",
    [phone, password],
    (err, user) => {
      if (!user) {
        return res.status(401).json({
          ok: false,
          error: "Telefon və ya şifrə yanlışdır"
        });
      }

      res.json({
        ok: true,
        user
      });
    }
  );
});

// 👤 ADMIN USERS
app.get("/admin/users", (req, res) => {
  db.all(
    "SELECT id, fullname, phone, created_at FROM users ORDER BY id DESC",
    (err, rows) => {
      res.json(rows || []);
    }
  );
});

// 🗂 GET CATEGORIES
app.get("/categories", (req, res) => {
  db.all(
    "SELECT * FROM categories ORDER BY id DESC",
    (err, rows) => {
      res.json(rows || []);
    }
  );
});

// 🗂 ADD CATEGORY
app.post("/admin/category", (req, res) => {
  const { name, key, image } = req.body;

  if (!name || !key) {
    return res.status(400).json({ ok:false, error:"Ad və key lazımdır" });
  }

  db.run(
    "INSERT INTO categories (name, key, image) VALUES (?, ?, ?)",
    [name, key, image || ""],
    function(err) {
      if (err) {
        return res.status(400).json({ ok:false, error:"Bu key artıq var" });
      }

      res.json({ ok:true, id:this.lastID });
    }
  );
});

// 🗂 UPDATE CATEGORY
app.put("/admin/category/:id", (req, res) => {
  const { name, key, image } = req.body;

  db.run(
    "UPDATE categories SET name=?, key=?, image=? WHERE id=?",
    [name, key, image || "", req.params.id]
  );

  res.json({ ok:true });
});

// 🗂 DELETE CATEGORY
app.delete("/admin/category/:id", (req, res) => {
  db.run("DELETE FROM categories WHERE id=?", [req.params.id]);
  res.json({ ok:true });
});

// 🧾 CREATE ORDER
app.post("/order", (req, res) => {
  const { product_name, customer_name, phone, note } = req.body;

  if (!product_name || !customer_name || !phone) {
    return res.status(400).json({
      ok: false,
      error: "Məhsul adı, ad və telefon lazımdır"
    });
  }

  db.run(
    "INSERT INTO orders (product_name, customer_name, phone, note) VALUES (?,?,?,?)",
    [product_name, customer_name, phone, note || ""]
  );

  res.json({ ok: true });
});

// 🧾 GET ORDERS
app.get("/admin/orders", (req, res) => {
  db.all(
    "SELECT * FROM orders ORDER BY id DESC",
    (err, rows) => {
      res.json(rows || []);
    }
  );
});

// ✅ COMPLETE ORDER
app.delete("/admin/order/:id", (req, res) => {
  db.run(
    "DELETE FROM orders WHERE id=?",
    [req.params.id]
  );

  res.json({ ok:true });
});

// 👷 CREATE VACANCY APPLICATION
app.post("/vacancy", (req, res) => {
  const { fullname, phone, position, experience, note } = req.body;

  if (!fullname || !phone || !position) {
    return res.status(400).json({
      ok: false,
      error: "Ad, telefon və vəzifə lazımdır"
    });
  }

  db.run(
    "INSERT INTO vacancies (fullname, phone, position, experience, note) VALUES (?,?,?,?,?)",
    [fullname, phone, position, experience || "", note || ""]
  );

  res.json({ ok: true });
});

// 👷 GET VACANCY APPLICATIONS
app.get("/admin/vacancies", (req, res) => {
  db.all(
    "SELECT * FROM vacancies ORDER BY id DESC",
    (err, rows) => {
      res.json(rows || []);
    }
  );
});

// ✅ DELETE VACANCY APPLICATION
app.delete("/admin/vacancy/:id", (req, res) => {
  db.run("DELETE FROM vacancies WHERE id=?", [req.params.id]);
  res.json({ ok: true });
});

// 📦 ADD PRODUCT
app.post("/product", (req, res) => {
  const { name, image, category, price, desc } = req.body;

  db.run(
    "INSERT INTO products (name,image,category,price,desc) VALUES (?,?,?,?,?)",
    [name, image, category, price, desc]
  );

  res.json({ ok: true });
});

// ✏️ UPDATE PRODUCT
app.put("/product/:id", (req, res) => {
  const { name, image, category, price, desc } = req.body;

  db.run(
    "UPDATE products SET name=?, image=?, category=?, price=?, desc=? WHERE id=?",
    [name, image, category, price, desc, req.params.id]
  );

  res.json({ ok: true });
});

// ✏️ UPDATE PRODUCT
app.put("/product/:id", (req, res) => {
  const { name, image, category, price, desc } = req.body;

  db.run(
    "UPDATE products SET name=?, image=?, category=?, price=?, desc=? WHERE id=?",
    [name, image, category, price, desc, req.params.id]
  );

  res.json({ ok: true });
});

// ✏️ UPDATE PRODUCT
app.put("/product/:id", (req, res) => {
  const { name, image, category, price, desc } = req.body;

  db.run(
    "UPDATE products SET name=?, image=?, category=?, price=?, desc=? WHERE id=?",
    [name, image, category, price, desc, req.params.id]
  );

  res.json({ ok: true });
});

// 🗑 DELETE PRODUCT
app.delete("/product/:id", (req, res) => {
  db.run("DELETE FROM products WHERE id=?", [req.params.id]);
  res.json({ ok: true });
});

// 📦 GET PRODUCTS
app.get("/products/:category", (req, res) => {
  db.all(
    "SELECT * FROM products WHERE category=?",
    [req.params.category],
    (err, rows) => {
      res.json(rows);
    }
  );
});


// ================= LIVE CHAT SYSTEM =================

db.run(`CREATE TABLE IF NOT EXISTS chat_rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id TEXT UNIQUE,
  mode TEXT DEFAULT 'ai',
  status TEXT DEFAULT 'open',
  created_at DATETIME DEFAULT (datetime('now', '+4 hours'))
)`);

db.run(`CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id TEXT,
  sender TEXT,
  text TEXT,
  created_at DATETIME DEFAULT (datetime('now', '+4 hours'))
)`);

async function aiReply(text) {
  const lower = String(text || "").toLowerCase();

  if (
    lower.includes("operator") ||
    lower.includes("canli") ||
    lower.includes("canlı") ||
    lower.includes("destek") ||
    lower.includes("dəstək") ||
    lower.includes("adam") ||
    lower.includes("insan")
  ) {
    return {
      needOperator: true,
      reply: "Canlı dəstəyə yönləndirildiniz ✅ Operator cavab verəcək."
    };
  }

  try {
    const OpenAI = require("openai");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `Sən Supellex Baku AI köməkçisisən.

Müştəri ilə normal, səmimi və ətraflı danış.
Hər mesajda operator təklif etmə.
Əvvəlcə sualı tam cavablandır.
Əgər müştəri əlaqə, sifariş, qiymət dəqiqləşdirmə və ya usta ilə danışmaq istəsə bu əlaqələri ver:
📞 +994 55 413 16 58
WhatsApp: https://wa.me/994554131658
Telegram: https://t.me/supellex_baku_bot

Yalnız bu hallarda sonda belə yaz:
"İstəsəniz sizi operatora yönləndirə bilərəm. Operatora qoşul"

Bu hallarda operator təklif et:
- sualı başa düşmədikdə
- dəqiq cavab verə bilmədikdə
- müştəri narazı olduqda
- ölçü/sifariş çox fərdi olduqda
- müştəri canlı dəstək, operator, insanla danışmaq, usta ilə danışmaq istədikdə

Canlı operator aktivdirsə AI müdaxilə etməməlidir.`,
        },
        {
          role: "user",
          content: text
        }
      ],
    });

    return {
      needOperator: false,
      reply: completion.choices[0].message.content
    };
  } catch (err) {
    console.log("OPENAI XƏTASI:", err.message);
    return {
      needOperator: false,
      reply: "AI cavab verə bilmədi ❌"
    };
  }
}

app.post("/live-chat/send", async (req, res) => {
  const { customer_id, text } = req.body;

  if (!customer_id || !text) {
    return res.status(400).json({ error: "customer_id və text lazımdır" });
  }

  db.get(
    "SELECT * FROM chat_rooms WHERE customer_id=? AND mode='operator' AND status='open'",
    [customer_id],
    async (err, room) => {
      if (room) {
        db.run(
          "INSERT INTO chat_messages (customer_id, sender, text) VALUES (?, ?, ?)",
          [customer_id, "customer", text]
        );

        return res.json({
          ok: true,
          mode: "operator",
          messages: [
            { sender: "customer", text }
          ]
        });
      }

      const ai = await aiReply(text);

      if (ai.needOperator) {
        db.run(
          "INSERT OR IGNORE INTO chat_rooms (customer_id, mode, status) VALUES (?, 'operator', 'open')",
          [customer_id]
        );

        db.run(
          "UPDATE chat_rooms SET mode='operator', status='open' WHERE customer_id=?",
          [customer_id]
        );

        db.run(
          "INSERT INTO chat_messages (customer_id, sender, text) VALUES (?, ?, ?)",
          [customer_id, "customer", text]
        );

        db.run(
          "INSERT INTO chat_messages (customer_id, sender, text) VALUES (?, ?, ?)",
          [customer_id, "system", ai.reply]
        );

        return res.json({
          ok: true,
          mode: "operator",
          messages: [
            { sender: "customer", text },
            { sender: "system", text: ai.reply }
          ]
        });
      }

      db.run(
        "INSERT INTO chat_messages (customer_id, sender, text) VALUES (?, ?, ?)",
        [customer_id, "customer", text]
      );

      db.run(
        "INSERT INTO chat_messages (customer_id, sender, text) VALUES (?, ?, ?)",
        [customer_id, "ai", ai.reply]
      );

      return res.json({
        ok: true,
        mode: "ai",
        messages: [
          { sender: "customer", text },
          { sender: "ai", text: ai.reply }
        ]
      });
    }
  );
});

app.get("/live-chat/messages/:customer_id", (req, res) => {
  db.all(
    "SELECT * FROM chat_messages WHERE customer_id=? ORDER BY id ASC",
    [req.params.customer_id],
    (err, rows) => {
      res.json(rows || []);
    }
  );
});

app.get("/admin/live-chats", (req, res) => {
  db.all(
    "SELECT * FROM chat_rooms WHERE status='open' ORDER BY id DESC",
    (err, rows) => {
      res.json(rows || []);
    }
  );
});

app.post("/admin/live-chat/reply", (req, res) => {
  const { customer_id, text } = req.body;

  db.run(
    "UPDATE chat_rooms SET mode='operator', status='open' WHERE customer_id=?",
    [customer_id]
  );

  db.run(
    "INSERT INTO chat_messages (customer_id, sender, text) VALUES (?, ?, ?)",
    [customer_id, "operator", text]
  );

  res.json({ ok: true });
});

app.post("/admin/live-chat/close", (req, res) => {
  const { customer_id } = req.body;

  db.run(
    "UPDATE chat_rooms SET mode='ai', status='closed' WHERE customer_id=?",
    [customer_id]
  );

  db.run(
    "INSERT INTO chat_messages (customer_id, sender, text) VALUES (?, ?, ?)",
    [customer_id, "system", "Çat bağlandı ✅ AI yenidən aktivdir."]
  );

  res.json({ ok: true });
});

// ================= END LIVE CHAT SYSTEM =================


// 🔐 ADMIN LOGIN
app.post("/admin/login", (req, res) => {
  const { password } = req.body;

  const raw = process.env.ADMIN_CODES || "";

  const users = raw
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);

  let foundUser = null;

  for (const item of users) {
    const parts = item.split(":");

    const code = parts[0];
    const name = parts[1] || "Admin";

    if (password === code) {
      foundUser = {
        code,
        name
      };
    }
  }

  if (foundUser) {
    return res.json({
      ok: true,
      token: process.env.ADMIN_TOKEN,
      user: foundUser.name
    });
  }

  return res.status(401).json({
    ok: false,
    error: "Kod yanlışdır ❌"
  });
});


// 🚀 START
app.listen(3000, () => {
  console.log("Supellex Backend READY 🚀");
});