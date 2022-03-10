import { Router } from 'express'
import postController from '../controllers/postController.js'
import userController from '../controllers/userController.js'


const untauthorizedRouter = Router()


untauthorizedRouter.get('/getallposts', postController.getAllPosts)
untauthorizedRouter.get('/user/:id', userController.getUserDataById)
untauthorizedRouter.post('/register', userController.register)
untauthorizedRouter.post('/login', userController.login)


export default untauthorizedRouter
