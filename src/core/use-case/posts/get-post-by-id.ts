import { eq } from 'drizzle-orm'
import { db } from '../../../infra/database.js'
import { postTable } from '../../../infra/schemas/posts.js'
import { Post } from '../../entities/post.js'

type Input = {
  id: string
}

type Output = Post | null

export class GetPostById {
  async execute(input: Input): Promise<Output> {
    const [exists] = await db
      .select({
        id: postTable.id,
        title: postTable.title,
        content: postTable.content,
        author_id: postTable.author_id,
        description: postTable.description,
      })
      .from(postTable)
      .where(eq(postTable.id, input.id))

    if (!exists) {
      return null
    }

    const post = new Post({
      id: exists.id,
      title: exists.title,
      content: exists.content,
      description: exists.description,
      author_id: exists.author_id,
    })

    return post
  }
}
