import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import dotenv from "dotenv"

import db from "../config/db.js"

dotenv.config()

export async function signUp(req, res) {
  const { name, email } = req.body
  try {
    const SALT = process.env.SALT
    const passwordHash = bcrypt.hashSync(req.body.password, SALT)

    await db.query(
      `INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    )
    return res.sendStatus(201)
  } catch (e) {
    console.log("Erro ao criar usuario", e)
    return res.sendStatus(422)
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body
  const token = uuid()

  try {
    const { rows: users } = await db.query(
      `SELECT *
      FROM usuarios u 
      WHERE u.email=$1`,
      [email]
    )
    const [user] = users

    if (!user) {
      console.log("Senha ou usuario invalidos")
      return res.sendStatus(401)
    }

    if (bcrypt.compareSync(password, user.password)) {
      await db.query(
        `INSERT INTO sessoes ("usuarioId", token) VALUES($1, $2)`,
        [user.id, token]
      )
      return res.status(200).send(token)
    }

    return res.sendStatus(422)
  } catch (e) {
    console.log("Erro ao logar usuario", e)
    return res.sendStatus(422)
  }
}
