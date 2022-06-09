import db from "../config/db.js"
import { nanoid } from "nanoid"

export async function shorten(req, res) {
  const url = req.body.url
  const shortUrl = nanoid(12)
  const { id } = res.locals.user
  // console.log(url)
  try {
    await db.query(
      `INSERT INTO links ("shortUrl", url, "usuarioId") VALUES ($1, $2, $3)`,
      [shortUrl, url, id]
    )
    return res.status(201).send({ shortUrl })
  } catch (e) {
    console.log("Erro ao encurtar url", e)
    return res.sendStatus(422)
  }
}
