import passport from 'passport'
import passJwt from 'passport-jwt'
import User from '../models/user.js'
import config from './config.js'

const JwtStrategy = passJwt.Strategy
const ExtractJwt = passJwt.ExtractJwt

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.JSONWEBTOKEN_SECRET

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, user) => {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
}))

export default passport
