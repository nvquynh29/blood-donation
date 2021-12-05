import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import initAPIs from './routes/api.js'
import organizationRouter from './routes/organization.js'
import eventRouter from './routes/event.js'
import volunteerRouter from './routes/volunteer.js'
import donationRouter from './routes/donation.js'
import isAdmin from './middleware/AdminMiddleware.js'
import requestBloodRouter from './routes/requestBlood.js'
import userRouter from './routes/user.js'
import giftRouter from './routes/gift.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const URI = process.env.DATABASE_URL

// middleware
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.use('/volunteer', volunteerRouter)
app.use('/organization', organizationRouter)
app.use('/event', eventRouter)
app.use('/donation', donationRouter)
app.use('/request-blood', requestBloodRouter)
app.use('/user', userRouter)
app.use('/gift', giftRouter)
initAPIs(app) // use isAuth middleware from this line
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
