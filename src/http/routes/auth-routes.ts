import { Application } from 'express'
import { SignIn } from '../../core/use-case/auth/sign-in.js'
import { AuthController } from '../controllers/auth-controller.js'
import { validate } from '../middlewares/validate.js'
import { signInSchema } from '../schemas/auth-schema.js'

export async function authRoutes(app: Application) {
  const signIn = new SignIn()
  const authController = new AuthController(signIn)

  app.post(
    '/signin',
    validate({ body: signInSchema }),
    authController.signIn.bind(authController)
  )
}
