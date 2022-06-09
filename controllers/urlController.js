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
    return res.sendStatus(404)
  }

  res.status(200).send(link)
}

export async function openLink(req, res) {
  const { shortUrl } = req.params
  const { rows: counts } = await urlRepository.getByShortUrl(shortUrl)
  const [count] = counts

  if (!count) {
    return res.sendStatus(404)
  }

  const newCount = count.visitCount + 1
  await urlRepository.insertVisit(shortUrl, newCount)

  res.status(200).redirect(count.url)
}
