import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

const { Pool } = pg

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const db = new Pool(databaseConfig)

try {
  await db.connect()
  console.log(`Conectado ao banco de dados`)
} catch (e) {
  console.log(`Erro ao conectar no banco de dados: ${e}`, e)
}

export default db
