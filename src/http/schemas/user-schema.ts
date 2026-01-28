import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const updateUserSchema = createUserSchema.partial()

export const userIdParamSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserIdParamInput = z.infer<typeof userIdParamSchema>
