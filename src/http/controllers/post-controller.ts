import { Request, Response } from 'express'
import type { CreatePost } from '../../core/use-case/posts/create-post.js'
import type { GetPosts } from '../../core/use-case/posts/get-posts.js'
import {
  postsQuerySchema,
  type CreatePostInput,
} from '../schemas/posts-schema.js'

export class PostController {
  constructor(
    private readonly getPosts: GetPosts,
    private readonly createPostUseCase: CreatePost
  ) {}

  async getAllPosts(request: Request, response: Response) {
    const { page, page_size, search } = postsQuerySchema.parse(request.query)

    const pagination = await this.getPosts.execute({ page, page_size, search })

    response.status(200).send(pagination)
  }

  async createPost(
    request: Request<{}, {}, CreatePostInput>,
    response: Response
  ) {
    const input = {
      title: request.body.title,
      content: request.body.content,
      description: request.body.description,
      image_base64: request.body.image_base64,
      author_id: request.user!.sub,
    }

    await this.createPostUseCase.execute(input)

    response.status(201).send()
  }
}
