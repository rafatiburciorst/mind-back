import express from 'express'
import { errorHandler } from './http/middlewares/error-handler.js'
import { userRoutes } from './http/routes/user-routes.js'

const app = express()
app.use(express.json())

userRoutes(app)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
