import path from 'node:path'
import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { env } from './env.js'
import { errorHandler } from './http/middlewares/error-handler.js'
import { authRoutes } from './http/routes/auth-routes.js'
import { postRoutes } from './http/routes/post-routes.js'
import { userRoutes } from './http/routes/user-routes.js'
import { swaggerSpec } from './http/swagger.js'

const app = express()
const PORT = env.APP_PORT

app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use('/uploads', express.static(path.resolve('uploads')))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

userRoutes(app)
postRoutes(app)
authRoutes(app)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`API docs are available on http://localhost:${PORT}/docs`)
})
