import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: { type: String, minLength: 1, maxLength: 20, required: true },
    content: { type: String, minLength: 1, maxLength: 200, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
      type: String,
      minLength: 3,
      maxLength: 16,
      required: true,
  },
}, { timestamps: {} })

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model('Post', postSchema)

export default Post