require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.send("Supellex AI Server işləyir 🚀");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const text = String(message || "").toLowerCase();

  if (
    text.includes("elaqe") || text.includes("əlaqə") ||
    text.includes("nomre") || text.includes("nömrə") ||
    text.includes("telefon") || text.includes("whatsapp") ||
    text.includes("telegram")
  ) {
    return res.json({
      reply: "Supellex Baku əlaqə məlumatları:\n\n📞 Telefon: +994 55 413 16 58\n💬 WhatsApp: https://wa.me/994554131658\n✈️ Telegram: https://t.me/supellex_baku_bot",
    });
  }

  if (
    text.includes("konum") || text.includes("ünvan") ||
    text.includes("unvan") || text.includes("adres") ||
    text.includes("yer") || text.includes("məkan")
  ) {
    return res.json({
      reply: "📍 Ünvan: Bakı, Binəqədi, 20-ci mədən, 1-ci korpus\n🕐 İş saatı: 09:00 - 19:00",
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Sən Supellex Baku mebel şirkətinin AI satış köməkçisisən. Müştərilərə mebel sifarişi, ölçü, qiymət və xidmətlər barədə kömək edirsən. Həmişə mehriban və peşəkar ol. Azərbaycan dilində cavab ver."
        },
        { role: "user", content: message }
      ],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Xəta baş verdi, zəhmət olmasa yenidən cəhd edin." });
  }
});

app.listen(3000, () => {
  console.log("Supellex AI Server started on port 3000");
});
