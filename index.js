import express from "express"
import OpenAI from "openai"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors(
    {
        origin: "*",
    }

))
app.use(express.json())

app.post("/chat", async (req, res) => {
    const { content } = req.body
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Eres 'OKR Genius', un asistente inteligente especializado en Objetivos y Resultados Clave (OKRs). Ayudas a los usuarios a definir, entender y alcanzar sus OKRs de manera efectiva y concisa.",
          },
          {
            role: "user",
            content: `genera una lista concisa de 1 Objetivo y 3 Resultados Clave (OKRs) para ${content}.`,
          },
        ],
        model: "gpt-3.5-turbo",
        // stream: true,
        max_tokens: 120,
        temperature: 0.7,
      });

    //   const stream = OpenAIStream(response);

      return res.json(response);
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})
