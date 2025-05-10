import express from "express"
import dotenv from "dotenv"
import OpenAI from "openai"
dotenv.config()

const router = express.Router()

const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
})

router.post("/chat", async (req, res) => {
  const { message } = req.body

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4", // or gpt-3.5-turbo if you're using the cheaper one
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for a software resale startup called SoftSell. Answer questions clearly and concisely.",
        },
        { role: "user", content: message },
      ],
    })

    const reply = response.data.choices[0].message.content.trim()
    res.json({ reply })
  } catch (error) {
    console.error("OpenAI error:", error)
    res.status(500).json({ reply: "Sorry, I couldn't process your request at the moment." })
  }
})

export default router

