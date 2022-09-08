const morgan = require('morgan')
const logger = require('./logger')

const requestLogger = morgan('tiny')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).send({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }