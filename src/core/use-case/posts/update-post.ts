import { eq } from 'drizzle-orm'
import { db } from '../../../infra/database.js'
import { postTable } from '../../../infra/schemas/posts.js'
import type { GetPostById } from './get-post-by-id.js'

type Input = {
  id: string
  title?: string
  description?: string
  content?: string
  author_id?: string
}

type Output = {}

export class UpdatePost {
  constructor(private readonly getPostById: GetPostById) {}

  async execute(input: Input): Promise<Output> {
    const exists = await this.getPostById.execute({ id: input.id })

    if (!exists) {
      throw new Error('Post with this ID does not exist.')
    }

    await db
      .update(postTable)
      .set({
        title: input.title,
        description: input.description,
        content: input.content,
        author_id: input.author_id,
      })
      .where(eq(postTable.id, input.id))

    return {}
  }
}
