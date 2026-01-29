import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_HOST: z.string().nonempty(),
  DATABASE_USER: z.string().nonempty(),
  DATABASE_PASSWORD: z.string().nonempty(),
  DATABASE_NAME: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
  APP_PORT: z.coerce.number().default(3333),
  IMAGE_BASE_URL: z.string().optional().default('http://localhost:3333'),
})

export const env = envSchema.parse(process.env)
