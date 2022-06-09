import db from "../config/db.js"
import { nanoid } from "nanoid"

import { urlRepository } from "../repositories/urlRepository.js"

export async function shorten(req, res) {
  const url = req.body.url
  const shortUrl = nanoid(12)
  const { id } = res.locals.user

  await urlRepository.insert(shortUrl, url, id)

  res.status(201).send({ shortUrl })
}

export async function getLinkInfos(req, res) {
  const { id } = req.params

  const { rows: links } = await urlRepository.getById(id)
  const [link] = links

  if (!link) {
    res.sendStatus(404)
  }

  const newCount = link.visitCount + 1
  await urlRepository.insertVisit(id, newCount)
  delete link.visitCount

  res.status(200).send(link)
}
