import { authSignInSchema, authSignUpSchema } from "../schemas/authSchema.js"

export function validateSignIn(req, res, next) {
  const { error } = authSignInSchema.validate(req.body)
  if (error) {
    console.log(error.details)
    return res.status(422).send(error.details)
  }

  next()
}

export function validateSignUp(req, res, next) {
  const { error } = authSignUpSchema.validate(req.body)
  const { password, confirmPassword } = req.body
  if (error) {
    return res.status(422).send(error.details)
  }

  if (password != confirmPassword) {
    return res.status(422).send("senhas nao coincidem")
  }
  next()
}
