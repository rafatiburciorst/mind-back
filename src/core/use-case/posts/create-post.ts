import { db } from '../../../infra/database.js'
import { postTable } from '../../../infra/schemas/posts.js'
import { Post } from '../../entities/post.js'

type Input = {
  title: string
  description: string
  content: string
  author_id: string
}

type Output = {}

export class CreatePost {
  async execute(input: Input): Promise<Output> {
    const post = new Post({
      title: input.title,
      description: input.description,
      content: input.content,
      author_id: input.author_id,
    })

    await db.insert(postTable).values({
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      author_id: post.author_id,
    })

    return {}
  }
}
