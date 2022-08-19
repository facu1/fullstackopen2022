const morgan = require('morgan')
const logger = require('./logger')

const requestLogger = morgan('tiny')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }