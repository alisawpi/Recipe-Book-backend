import express from 'express'
require('express-async-errors')
const app = express()
import cors from 'cors'
import recipeRouter from './controllers/recipes'
import authRouter from './controllers/auth' 
import config from './utils/config'
import mongoose from 'mongoose'
import { logger, errorHandler, unknownEndpoint, tokenExtractor } from './middleware/middleware'


app.use(cors())
app.use(express.json())

let MONGO_URI = '';
if (config.MONGODB_URI) {
  MONGO_URI = config.MONGODB_URI
} else {
  logger.error('Mongo uri is undefined')
}
logger.info(`Connecting to ${MONGO_URI}`)
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    logger.error('error connection to MongoDB:', error.message)
  });
app.use(tokenExtractor)
app.use('/api/recipes', recipeRouter)
app.use('/api/users', authRouter) 
app.use(unknownEndpoint)
app.use(errorHandler)

export default app