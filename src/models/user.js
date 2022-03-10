import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 16,
        unique: true,
        required: true,
    },
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: {} })

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
        delete returnedObject.createdAt
        delete returnedObject.updatedAt
    }
})

const User = mongoose.model('User', userSchema)

export default User
