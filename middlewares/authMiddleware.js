import { v4 as uuid } from "uuid"

import { authSignInSchema, authSignUpSchema } from "../schemas/authSchema.js"

export async function validateSignIn(req, res, next) {
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
