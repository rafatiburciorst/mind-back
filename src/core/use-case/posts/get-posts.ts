import { eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../../../infra/database.js'
import { postTable } from '../../../infra/schemas/posts.js'
import { Pagination } from '../../../utils/paginations.js'
import { Post } from '../../entities/post.js'

type Input = {
  page: number
  page_size: number
  search?: string
}

type Output = Pagination<Post>

export class GetPosts {
  async execute(input: Input): Promise<Output> {
    const { page, page_size, search } = input

    const data = await db
      .select({
        ...getTableColumns(postTable),
        total: sql<number>`count(${postTable.id}) over ()`,
      })
      .from(postTable)
      .where(search ? eq(postTable.title, search) : undefined)
      .limit(page_size)
      .offset((page - 1) * page_size)

    const posts = data.map(
      item =>
        new Post({
          id: item.id,
          title: item.title,
          content: item.content,
          author_id: item.author_id,
          created_at: item.created_at,
          updated_at: item.updated_at,
          description: item.description,
        })
    )

    const pagination = new Pagination<Post>({
      items: posts,
      page,
      page_size,
      total: data.at(0)?.total ?? 0,
    })

    return pagination
  }
}
