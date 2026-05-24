require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const db = new sqlite3.Database("./support.db");

db.run(`
  CREATE TABLE IF NOT EXISTS support_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    reply TEXT DEFAULT '',
    replied_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c");
}

app.get("/", (req, res) => {
  res.send("Supellex AI Server işləyir 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const clean = normalizeText(message);

    const contactWords = [
      "elaqe",
      "telefon",
      "nomre",
      "whatsapp",
      "telegram",
      "zeng",
      "contact",
    ];

    const addressWords = [
      "konum",
      "unvan",
      "adres",
      "yer",
      "mekan",
      "location",
      "haradasiniz",
      "hardasiniz",
    ];

    const liveSupportWords = [
      "canli destek",
      "canli destey",
      "canli destek isteyirem",
      "canli destey isteyirem",
      "operator",
      "usta",
      "insan",
      "menecer",
      "satici",
      "adamla danisim",
      "canli danisim",
      "isleyene yazim",
      "sizinle danisim",
    ];

    if (contactWords.some((word) => clean.includes(word))) {
      return res.json({
        reply:
          "Supellex Baku əlaqə məlumatları:\n\n📞 Telefon: +994 55 413 16 58\n💬 WhatsApp: https://wa.me/994554131658\n✈️ Telegram: https://t.me/supellex_baku_bot",
      });
    }

    if (addressWords.some((word) => clean.includes(word))) {
      return res.json({
        reply:
          "📍 Ünvan: Bakı, Binəqədi, 20-ci mədən, 1-ci korpus\n🕐 İş saatı: 09:00 - 19:00",
      });
    }

    if (liveSupportWords.some((word) => clean.includes(word))) {
      return res.json({
        reply:
          "Sizi canlı dəstəyə yönləndirə bilərəm. Mesajınızı göndərin.",
        showLiveSupport: true,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
Sən Supellex Baku mebel şirkətinin AI satış köməkçisisən.

Məlumatlar:
📞 Telefon: +994 55 413 16 58
💬 WhatsApp: https://wa.me/994554131658
✈️ Telegram: https://t.me/supellex_baku_bot
📍 Ünvan: Bakı, Binəqədi, 20-ci mədən, 1-ci korpus
🕐 İş saatı: 09:00 - 19:00

Qaydalar:
- Azərbaycan dilində cavab ver
- Mehriban və peşəkar danış
- Saxta nömrə və ya saxta məlumat yazma
- Müştəri canlı insan istəsə tətbiq daxili canlı dəstəyə yönləndir
- WhatsApp və Telegram təklif etmə
- Qısa və aydın cavab ver
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      reply: "Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.",
    });
  }
});

app.post("/support/message", (req, res) => {
  const { name, phone, message } = req.body;

  if (!message) {
    return res.status(400).json({
      ok: false,
      error: "Mesaj boş ola bilməz",
    });
  }

  db.run(
    `INSERT INTO support_messages (name, phone, message) VALUES (?, ?, ?)`,
    [name || "", phone || "", message],
    function (err) {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: "Mesaj yadda saxlanmadı",
        });
      }

      res.json({
        ok: true,
        id: this.lastID,
        reply:
          "Mesajınız canlı dəstəyə göndərildi. Tezliklə cavab veriləcək.",
      });
    }
  );
});

app.get("/support/messages", (req, res) => {
  db.all(
    `SELECT * FROM support_messages ORDER BY id DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: "Mesajlar oxunmadı",
        });
      }

      res.json({
        ok: true,
        messages: rows,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Supellex AI Server started on port ${PORT} 🚀`);
});

app.post("/support/reply", (req, res) => {
  const { id, reply } = req.body;

  if (!id || !reply) {
    return res.status(400).json({
      ok: false,
      error: "ID və cavab lazımdır",
    });
  }

  db.run(
    `UPDATE support_messages
     SET reply = ?, status = 'answered', replied_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [reply, id],
    function (err) {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: "Cavab yadda saxlanmadı",
        });
      }

      res.json({
        ok: true,
        reply: "Cavab müştəriyə göndərildi.",
      });
    }
  );
});

app.get("/support/message/:id", (req, res) => {
  db.get(
    `SELECT * FROM support_messages WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err || !row) {
        return res.status(404).json({
          ok: false,
          error: "Mesaj tapılmadı",
        });
      }

      res.json({
        ok: true,
        message: row,
      });
    }
  );
});
