import { Request, Response } from 'express'
import type { SignIn } from '../../core/use-case/auth/sign-in.js'
import { SignInInput } from '../schemas/auth-schema.js'

export class AuthController {
  constructor(private readonly signInUseCase: SignIn) {}

  async signIn(request: Request<{}, {}, SignInInput>, response: Response) {
    const { email, password } = request.body

    const { token, user } = await this.signInUseCase.execute({
      email,
      password,
    })

    response.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  }
}
