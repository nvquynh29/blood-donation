import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const URI = process.env.DATABASE_URL

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.get('/', (_, res) => {
  res.send('Welcome to UET!')
})



mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
