import z from 'zod'

export const postsQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  page_size: z.coerce.number().optional().default(10),
  search: z.string().optional(),
})

export type PostsQueryInput = z.infer<typeof postsQuerySchema>
