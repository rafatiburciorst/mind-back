import { eq } from 'drizzle-orm'
import { db } from '../../../infra/database.js'
import { userTable } from '../../../infra/schemas/users.js'
import type { GetUserById } from './get-user-by-id.js'

type Input = {
  id: string
  name?: string
  email?: string
}

type Output = {}

export class UpdateUser {
  constructor(private readonly getUserById: GetUserById) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.getUserById.execute({ id: input.id })

    if (!user) {
      throw new Error('User not found')
    }

    await db
      .update(userTable)
      .set({
        name: input.name,
        email: input.email,
      })
      .where(eq(userTable.id, input.id))

    return {}
  }
}
