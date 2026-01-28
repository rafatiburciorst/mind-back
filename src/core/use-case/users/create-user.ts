import { hash } from 'bcryptjs'
import { db } from '../../../infra/database.js'
import { userTable } from '../../../infra/schemas/users.js'
import { User } from '../../entities/user.js'

type Input = {
  name: string
  email: string
  password: string
}

type Output = {}

export class CreateUser {
  async execute(input: Input): Promise<Output> {
    const password_hash = await hash(input.password, 6)

    const user = new User({
      name: input.name,
      email: input.email,
      password: password_hash,
    })

    await db.insert(userTable).values(user)

    return {}
  }
}
