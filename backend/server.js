require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function isWorkTime() {
  const now = new Date();
  const hour = now.getHours();

  return hour >= 9 && hour < 19;
}

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const workTime = isWorkTime();

    const systemPrompt = workTime
      ? "Sən Supellex Baku AI köməkçisisən. Premium mebel sifarişləri barədə qısa və faydalı cavab ver."
      : "Hazırda iş vaxtı deyil. İş saatları 09:00–19:00 arasındadır. İstifadəçiyə AI olaraq kömək etməyə davam et.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "AI server xətası baş verdi.",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Supellex AI Server işləyir 🚀");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});