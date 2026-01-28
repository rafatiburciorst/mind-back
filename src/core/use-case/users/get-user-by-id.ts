import { eq } from 'drizzle-orm'
import { db } from '../../../infra/database.js'
import { userTable } from '../../../infra/schemas/users.js'
import { User } from '../../entities/user.js'

type Input = {
  id: string
}

type Output = User | null

export class GetUserById {
  async execute(input: Input): Promise<Output> {
    const [data] = await db
      .select({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
      })
      .from(userTable)
      .where(eq(userTable.id, input.id))

    if (!data) {
      return null
    }

    const user = new User({
      id: data.id,
      name: data.name,
      email: data.email,
    })

    return user
  }
}
