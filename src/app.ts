import cors from 'cors'
import express from 'express'
import { errorHandler } from './http/middlewares/error-handler.js'
import { postRoutes } from './http/routes/post-routes.js'
import { userRoutes } from './http/routes/user-routes.js'

const app = express()
app.use(cors())
app.use(express.json())

userRoutes(app)
postRoutes(app)

app.use(errorHandler)

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3000')
})
