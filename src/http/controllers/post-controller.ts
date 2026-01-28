import { Request, Response } from 'express'
import type { GetPosts } from '../../core/use-case/posts/get-posts.js'
import type { PostsQueryInput } from '../schemas/posts-schema.js'

export class PostController {
  constructor(private readonly getPosts: GetPosts) {}

  async getAllPosts(request: Request, response: Response) {
    const { page, page_size, search } = request.query as unknown as PostsQueryInput

    const pagination = await this.getPosts.execute({ page, page_size, search })

    response.status(200).send(pagination)
  }
}
