import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../../env.js'
import { db } from '../../../infra/database.js'
import { userTable } from '../../../infra/schemas/users.js'
import { User } from '../../entities/user.js'

type Input = {
  email: string
  password: string
}

type Output = { token: string; user: User }

export class SignIn {
  async execute(input: Input): Promise<Output> {
    const { email, password } = input

    const [exists] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))

    if (!exists) {
      throw new Error('Invalid credentials')
    }

    const user = new User(exists)

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return {
      token,
      user,
    }
  }
}
