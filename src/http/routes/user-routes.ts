import { Application } from 'express'
import { CreateUser } from '../../core/use-case/users/create-user.js'
import { GetUserById } from '../../core/use-case/users/get-user-by-id.js'
import { UpdateUser } from '../../core/use-case/users/update-user.js'
import { UserController } from '../controllers/user-controller.js'
import { validate } from '../middlewares/validate.js'
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from '../schemas/user-schema.js'

export async function userRoutes(app: Application) {
  const getUserById = new GetUserById()
  const createUser = new CreateUser()
  const updateUser = new UpdateUser(getUserById)
  const userController = new UserController(createUser, updateUser)

  app.post(
    '/users',
    validate({ body: createUserSchema }),
    userController.create.bind(userController)
  )
  app.put(
    '/users/:id',
    validate({ params: userIdParamSchema, body: updateUserSchema }),
    userController.update.bind(userController)
  )
  app.get('/users/profile', userController.profile.bind(userController))
}
