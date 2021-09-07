import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import os from 'os'

const port = 3000
const app = express()
app.get('/', (req, res) => {
  res.send('Hello')
})
app.listen(port)
// app.use(bodyParser.json({ limit: '30mb', extend: true }))
// app.use(bodyParser.json({ limit: '30mb', extend: true }))
// console.log(os.type())
