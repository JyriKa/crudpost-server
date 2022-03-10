import express from "express"
import mongoose from "mongoose"
import 'express-async-errors'
import unahtorizedRouter from './routes/unauthorizedRoutes.js'
import authorizedRouter from './routes/authorizedRoutes.js'
import passport from "./utils/passport.js"
import config from './utils/config.js'
import { invalidEndpoints, reqLogger, errorHandler } from './utils/middleware.js'

console.log('Connecting to', config.MONGO_URI)

mongoose.connect(
    config.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Database connection established succesfully'))
    .catch(err => console.log('Database connection error: ' + err))


const app = express()


app.use(express.json())
app.use(reqLogger)
app.use('/api', unahtorizedRouter)
app.use('/api/authorized', passport.authenticate('jwt', { session: false }), authorizedRouter)
app.use(invalidEndpoints)
app.use(errorHandler)


export default app
