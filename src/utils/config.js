import 'dotenv/config'

const SERVER_PORT = process.env.SERVER_PORT
const JSONWEBTOKEN_SECRET = process.env.JSONWEBTOKEN_SECRET
const MONGO_URI = process.env.MONGO_URI

const config = {
    SERVER_PORT,
    JSONWEBTOKEN_SECRET,
    MONGO_URI
}

export default config