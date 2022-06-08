import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"

import db from "./config/db.js"
import router from "./routes/index.js"

const app = express()
app.use(cors())
app.use(json())
dotenv.config()

// routes
app.use(router)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Servidor em pé na porta ${port}`))

try {
  await db.connect()
  console.log(`Conectado ao banco de dados`)
} catch (e) {
  console.log(`Erro ao conectar no banco de dados: ${e}`, e)
}
