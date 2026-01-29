import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_HOST: z.string().nonempty(),
  DATABASE_USER: z.string().nonempty(),
  DATABASE_PASSWORD: z.string().nonempty(),
  DATABASE_NAME: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
})

export const env = envSchema.parse(process.env)
