import { Application } from 'express'
import { CreatePost } from '../../core/use-case/posts/create-post.js'
import { GetPosts } from '../../core/use-case/posts/get-posts.js'
import { PostController } from '../controllers/post-controller.js'
import { auth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createPostSchema, postsQuerySchema } from '../schemas/posts-schema.js'

export async function postRoutes(app: Application) {
  const getPosts = new GetPosts()
  const createPost = new CreatePost()
  const postController = new PostController(getPosts, createPost)

  app.post(
    '/posts',
    validate({ query: postsQuerySchema }),
    postController.getAllPosts.bind(postController)
  )

  app.post(
    '/posts',
    auth,
    validate({
      body: createPostSchema,
    }),
    postController.createPost.bind(postController)
  )
}
