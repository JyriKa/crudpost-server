import http from 'http'
import app from './app.js'
import config from './utils/config.js'


const server = http.createServer(app)

server.listen(config.SERVER_PORT, () => {
  console.log(`Server port: ${config.SERVER_PORT}`)
})
