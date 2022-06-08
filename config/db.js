import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

const { Pool } = pg

const databaseConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123",
  database: "shortly",
}

// const databaseConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// }

const db = new Pool(databaseConfig)

// const query = db.query("SELECT * FROM links")

// query.then((result) => {
//   console.log(result.rows)
// })

export default db
