import Post from "../models/post.js"


const getAllPosts = async (request, response) => {
    const posts = await Post.find({}).sort({createdAt: 'descending'}).limit(200)
    response.json(posts.map(post => post.toJSON()))
}

const newPost = async (request, response) => {
    const { title, content } = request.body
    const user = request.user

    const post = new Post({
        title,
        content,
        creator: user._id,
        createdBy: user.name
    })

    const savedPost = await post.save()

    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    response.json(savedPost.toJSON())
}

const likePost = async (request, response) => {
    const user = request.user
    const id = request.params.id

    const post = await Post.findById(id)

    if (!post) {
        return response.status(400).end()
    }

    if (post.likes.includes(user._id)) {
        return response.status(400).end()
    }

    post.likes = post.likes.concat(user._id)
    await post.save()

    response.status(200).end()
}

const removePost = async (request, response) => {
    const id = request.params.id
    const user = request.user
    if (!user.posts.includes(id)) {
        return response.status(400).end()
    }
    await Post.findByIdAndRemove(id)

    user.posts = user.posts.filter(post => post._id != id)
    await user.save()

    response.status(204).end()
}

export default {
    getAllPosts,
    newPost,
    likePost,
    removePost
}