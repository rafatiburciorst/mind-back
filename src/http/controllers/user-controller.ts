import { Request, Response } from 'express'
import { CreateUser } from '../../core/use-case/users/create-user.js'
import type { UpdateUser } from '../../core/use-case/users/update-user.js'
import type {
  CreateUserInput,
  UpdateUserInput,
  UserIdParamInput,
} from '../schemas/user-schema.js'

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser
  ) {}

  async create(request: Request<{}, {}, CreateUserInput>, response: Response) {
    const input = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    }
    await this.createUser.execute(input)
    response.status(201).send({ message: 'User created successfully' })
  }

  async update(
    request: Request<UserIdParamInput, {}, UpdateUserInput>,
    response: Response
  ) {
    const input = {
      id: request.params.id,
      name: request.body.name,
      email: request.body.email,
    }
    await this.updateUser.execute(input)
    response.status(200).send({ message: 'User updated successfully' })
  }

  async profile(request: Request, response: Response) {
    response.status(200).send({ message: 'User profile data' })
  }
}
