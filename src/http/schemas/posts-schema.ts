import z from 'zod'

export const postsQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  page_size: z.coerce.number().optional().default(10),
  search: z.string().optional(),
})

export const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  description: z.string().min(1).max(500),
  image_base64: z
    .string()
    .regex(/^data:image\/\w+;base64,.+$/, 'Invalid base64 image format')
    .optional(),
})

export const updatePostParamsSchema = z.object({
  id: z.string(),
})

export type PostsQueryInput = z.infer<typeof postsQuerySchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type PostParamsIDInput = z.infer<typeof updatePostParamsSchema>
