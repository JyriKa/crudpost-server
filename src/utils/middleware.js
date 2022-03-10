const invalidEndpoints = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const reqLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path  : ', request.path)
  console.log('Body  : ', request.body)
  console.log('-----')
  next()
}


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && request.path === '/api/register') {
    return response.status(400).json({ error: 'name exists already' })
  }
  next(error)
}

export {
  invalidEndpoints,
  reqLogger,
  errorHandler,
}
