import { urlSchema } from "../schemas/urlSchema.js"

export function validateURL(req, res, next) {
  const { error } = urlSchema.validate(req.body)

  if (error) {
    return res.status(422).send(
      error.details.map((e) => {
        return e.message
      })
    )
  }

  next()
}
