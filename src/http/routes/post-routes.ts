import { Application } from 'express'
import { CreatePost } from '../../core/use-case/posts/create-post.js'
import { DeletePost } from '../../core/use-case/posts/delete-post.js'
import { GetPostById } from '../../core/use-case/posts/get-post-by-id.js'
import { GetPosts } from '../../core/use-case/posts/get-posts.js'
import { UpdatePost } from '../../core/use-case/posts/update-post.js'
import { PostController } from '../controllers/post-controller.js'
import { auth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import {
  createPostSchema,
  postsQuerySchema,
  updatePostParamsSchema,
} from '../schemas/posts-schema.js'

export async function postRoutes(app: Application) {
  const getPosts = new GetPosts()
  const createPost = new CreatePost()
  const getPostById = new GetPostById()
  const updatePost = new UpdatePost(getPostById)
  const deletePost = new DeletePost(getPostById)
  const postController = new PostController(
    getPosts,
    createPost,
    updatePost,
    deletePost
  )

  app.post(
    '/posts',
    validate({ query: postsQuerySchema }),
    postController.getAllPosts.bind(postController)
  )

  app.post(
    '/posts/create',
    auth,
    validate({
      body: createPostSchema,
    }),
    postController.createPost.bind(postController)
  )

  app.put(
    '/posts/:id',
    auth,
    validate({
      body: createPostSchema.partial(),
      params: updatePostParamsSchema,
    }),
    postController.editPost.bind(postController)
  )

  app.delete(
    '/posts/:id',
    auth,
    validate({ params: updatePostParamsSchema }),
    postController.deletePost.bind(postController)
  )
}
