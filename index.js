import express from 'express'
import * as cheerio from 'cheerio'
import { extract } from '@extractus/article-extractor'

const app = express()

// const meta = {
//   service: 'article-parser',
//   lang: 'javascript',
//   server: 'express',
//   platform: 'node',
// }

app.get('/', async (req, res) => {
  const url = req.query.url
  if (!url) {
    return res.json(meta)
  }
  try {
    // With Fetch
    // const resp = await fetch(url)
    // const html = await resp.text()
    // const data = await extractFromHtml(html)
    const data = await extract(url)
    const chparser = cheerio.load(data.content)
    const pricesElement  = chparser('p:contains("$")')
    let prices = precioElement.text()

    return res.json({
      error: 0,
      message: 'article has been extracted successfully',
      data,
      // precio
    })
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
      data: null,
      precio: null
    })
  }
})

app.listen(3100, () => {
  console.log('Server is running at http://localhost:3100')
})
