import User from '../models/user.js'
import bcrypt from 'bcrypt'
import pgk from 'jsonwebtoken'
const { sign } = pgk


const getUserDataById = async (request, response) => {
    const id = request.params.id
    const user = await User.findById(id)
    if (!user) {
        return response.status(400).end()
    }

    await user.populate('posts')

    response.json(user.toJSON())
}

const register = async (request, response) => {
    const body = request.body

    if ((typeof body.password) != 'string') {
        return response.status(400).json({
            error: 'password field required'
        })
    }

    if (body.password.length < 5) {
        return response.status(400).json({
            error: 'minimum password length is 5'
        })
    }

    const password = await bcrypt.hash(body.password, 10)

    const newUser = new User({
        name: body.name,
        password,
    })

    const savedUser = await newUser.save()
    response.json(savedUser)
}

const login = async (request, response) => {
    const body = request.body

    if (!body.name || !body.password) {
        return response.status(401).json({
            error: 'invalid credentials'
        })
    }

    const user = await User.findOne({ name: body.name })
    const validPassword = !user ?
        false
        : await bcrypt.compare(body.password, user.password)

    if (!user || !validPassword) {
        return response.status(401).json({
            error: 'invalid credentials'
        })
    }

    const tokenUser = { id: user._id, }
    const token = sign(tokenUser, process.env.JSONWEBTOKEN_SECRET)

    return response.status(200).send({ id: user._id, name: user.name, token })
}


export default {
    getUserDataById,
    register,
    login
}
