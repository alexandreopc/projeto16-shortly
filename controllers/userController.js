import db from "../config/db.js"

export async function getUser(req, res) {
  const { id } = req.params

  try {
    const { rows: result } = await db.query(
      `SELECT u.id,  u.name,
      SUM(links."visitCount") as "visitCount"
      FROM usuarios u
      LEFT JOIN links ON links."usuarioId"=u.id
      WHERE u.id=$1
      GROUP BY u.id
    `,
      [id]
    )
    const [user] = result
    if (!user) {
      return res.sendStatus(404)
    }
    user.visitCount = Number(user.visitCount)

    const shortenedUrls = await db.query(
      `SELECT l.id, l."shortUrl", l.url, l."visitCount"
      FROM links l 
      WHERE "usuarioId"=$1`,
      [id]
    )

    res.status(200).send({
      ...user,
      shortenedUrls: shortenedUrls.rows,
    })
  } catch (e) {
    return res.sendStatus(500)
  }
}

export async function ranking(req, res) {
  try {
    const { rows: result } = await db.query(
      `SELECT u.id,  u.name,
      COUNT(links.id) as "linksCount",
      SUM(links."visitCount") as "visitCount"
      FROM usuarios u
      LEFT JOIN links ON links."usuarioId"=u.id
      GROUP BY u.id
      ORDER BY "visitCount" DESC NULLS LAST LIMIT 10;
      `
    )
    console.log(result)
    result.forEach((row) => {
      if (row.visitCount === null) row.visitCount = 0
      row.visitCount = Number(row.visitCount)
      row.linksCount = Number(row.linksCount)
    })

    res.status(200).send(result)
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
}
