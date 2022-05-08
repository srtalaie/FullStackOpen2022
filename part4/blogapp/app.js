const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app