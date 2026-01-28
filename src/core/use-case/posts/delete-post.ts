import { eq } from 'drizzle-orm'
import { db } from '../../../infra/database.js'
import { postTable } from '../../../infra/schemas/posts.js'
import type { GetPostById } from './get-post-by-id.js'

type Input = {
  id: string
}

type Output = {}

export class DeletePost {
  constructor(private readonly getPostById: GetPostById) {}

  async execute(input: Input): Promise<Output> {
    const exists = await this.getPostById.execute({ id: input.id })

    if (!exists) {
      throw new Error('Post with this ID does not exist.')
    }

    await db.delete(postTable).where(eq(postTable.id, input.id))

    return {}
  }
}
