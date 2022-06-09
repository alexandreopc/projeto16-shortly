import db from "../config/db.js"

async function insert(shortUrl, url, id) {
  return db.query(
    `INSERT INTO links ("shortUrl", url, "usuarioId") 
    VALUES ($1, $2, $3)`,
    [shortUrl, url, id]
  )
}

async function getById(id) {
  return db.query(
    `SELECT *
    FROM links l
    WHERE id=$1`,
    [id]
  )
}

async function insertVisit(shortUrl, count) {
  return db.query(
    `UPDATE links 
    SET "visitCount"=$1
    WHERE "shortUrl"=$2`,
    [count, shortUrl]
  )
}

async function getByShortUrl(shortUrl) {
  return db.query(
    `SELECT l."visitCount", l.url
      FROM links l
      WHERE "shortUrl"=$1`,
    [shortUrl]
  )
}

async function deleteLink(id) {
  return db.query(
    `DELETE FROM links 
    WHERE id=$1`,
    [id]
  )
}

export const urlRepository = {
  insert,
  getById,
  insertVisit,
  getByShortUrl,
  deleteLink,
}
