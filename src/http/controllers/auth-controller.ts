import { Request, Response } from 'express'

export class UserController {
  constructor() {}

  async signIn(request: Request<{}, {}, {}>, response: Response) {
    response.status(201).send({ message: 'User created successfully' })
  }
}
