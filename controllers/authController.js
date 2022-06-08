import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

import db from "../config/db.js"

export async function signUp(req, res) {
  const { name, email } = req.body
  try {
    const SALT = 10
    const passwordHash = bcrypt.hashSync(req.body.password, SALT)

    const result = await db.query(
      `
    INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    )
    return res.sendStatus(201)
  } catch (e) {
    console.log("Error creating new user.", e)
    return res.sendStatus(422)
  }
}

export async function signIn(req, res) {}
