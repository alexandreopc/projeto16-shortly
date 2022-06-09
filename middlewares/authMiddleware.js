import { authSignInSchema, authSignUpSchema } from "../schemas/authSchema.js"

import db from "../config/db.js"

export function validateSignIn(req, res, next) {
  const { error } = authSignInSchema.validate(req.body)

  if (error) {
    return res.status(422).send(
      error.details.map((e) => {
        return e.message
      })
    )
  }

  next()
}

export function validateSignUp(req, res, next) {
  const { error } = authSignUpSchema.validate(req.body)
  const { password, confirmPassword } = req.body
  if (error) {
    return res.status(422).send(
      error.details.map((e) => {
        return e.message
      })
    )
  }

  if (password != confirmPassword) {
    return res.status(422).send("senhas nao coincidem")
  }
  next()
}

export async function validateToken(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if (!token) {
    console.log("token nao enviado")
    return res.sendStatus(401)
  }

  try {
    const { rows: sessions } = await db.query(
      `SELECT * FROM sessoes s
      WHERE s.token=$1`,
      [token]
    )
    const [session] = sessions

    if (!session) {
      console.log("sessao nao encontrada")
      return res.sendStatus(401)
    }

    const { rows: users } = await db.query(
      `SELECT * FROM usuarios u 
      WHERE u.id=$1`,
      [session.usuarioId]
    )
    // TODO: CONCERTAR USUARIOID NA SESSOES E MUDAR RESTO PARA INGLES
    const [user] = users

    if (!user) {
      console.log("usuario nao encontrado")
      return res.sendStatus(401)
    }

    res.locals.user = user
  } catch (e) {
    console.log("usuario ou sessao nao autenticado", e)
    return res.sendStatus(422)
  }
  next()
}
