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
  delete link.visitCount
  delete link.usuarioId
  delete link.createdAt
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

export async function deleteLink(req, res) {
  const { id } = req.params
  const { user } = res.locals

  const { rows: links } = await urlRepository.getById(id)
  const [link] = links

  if (!link) {
    return res.sendStatus(404)
  }
  if (user.id != link.usuarioId) {
    return res.sendStatus(401)
  }

  await urlRepository.deleteLink(id)
  res.sendStatus(204)
}
