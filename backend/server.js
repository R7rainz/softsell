import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import chatRoutes from "./routes/chat.js"

dotenv.config()

const app = express()

app.use(cors()) // Allow requests from frontend
app.use(express.json()) // Parse incoming JSON

app.use("/api", chatRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))

