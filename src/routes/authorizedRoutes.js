import { Router } from 'express'
import postController from '../controllers/postController.js'


const authorizedRouter = Router()


authorizedRouter.post('/newpost', postController.newPost)
authorizedRouter.put('/likepost/:id', postController.likePost)
authorizedRouter.delete('/removepost/:id', postController.removePost)


export default authorizedRouter