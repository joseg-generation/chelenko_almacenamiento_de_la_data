const logger = require ('./logger')
const requestLogger = (req,res, next) => {
logger.info('Metho:',req.method)
logger.info('Path:',req.path)
logger.info('Body:',req.body)
logger.info('---')
next()

}
//Middleware personalizados
const unknownEndpoint = (req,res) => {
    res.status(404).send({ error:'ruta desconocida'})
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'castError') {
      return res.status(400).send({error:'malformatted id' })
  } else if (error.name === 'validationError') {
      return res.status(400).json({ error: error.message})
  }
  next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}