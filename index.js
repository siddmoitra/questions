const express = require('express')
const app = express()
const { Client } = require('pg')
const client = new Client()
const port = 3000

app.get('/db-time', async (req, res) => {
  try {
    await client.connect()

    const time = await client.query('SELECT NOW() as now')
    const timeValue = time.rows[0]
    console.log(`DB Time requested, response as: ${timeValue}`)

    res.status(200).send({ time: timeValue })
  } catch(err) {
    console.error(`Could not probably connect to DB: ${err.message}`)
    res.status(500).send({ error: err.message })
  } finally {
    await client.end()
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})