import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { env } from '../../../env.js'
import { db } from '../../../infra/database.js'
import { commentTable } from '../../../infra/schemas/comments.js'
import { postTable } from '../../../infra/schemas/posts.js'
import { userTable } from '../../../infra/schemas/users.js'
import { Pagination } from '../../../utils/paginations.js'
import { Comment } from '../../entities/comment.js'
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
        image_url: sql`${env.IMAGE_BASE_URL}/${postTable.image_url}`,
        author: userTable.name,
        comments: sql`
          COALESCE(
            JSON_ARRAYAGG(
              CASE WHEN ${commentTable.id} IS NOT NULL THEN
                JSON_OBJECT(
                  'id', ${commentTable.id},
                  'content', ${commentTable.content},
                  'author', ${userTable.name},
                  'created_at', ${commentTable.created_at}
                )
              END
            ),
            JSON_ARRAY()
          )
        `,
        total: sql<number>`count(${postTable.id}) over ()`,
      })
      .from(postTable)
      .innerJoin(userTable, eq(postTable.author_id, userTable.id))
      .leftJoin(commentTable, eq(commentTable.post_id, postTable.id))
      .where(search ? eq(postTable.title, search) : undefined)
      .limit(page_size)
      .offset((page - 1) * page_size)
      .groupBy(postTable.id, userTable.name)
      .orderBy(desc(postTable.created_at))

    const posts = data.map(item => {
      const comments = ((item.comments as any[]) || [])
        .filter(comment => comment !== null)
        .map(
          comment =>
            new Comment({
              id: comment.id,
              content: comment.content,
              author: comment.author,
              post_id: item.id,
              created_at: comment.created_at,
            })
        )

      return new Post({
        id: item.id,
        title: item.title,
        content: item.content,
        author_id: item.author_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        description: item.description,
        comments,
      })
    })

    const pagination = new Pagination<Post>({
      items: posts,
      page,
      page_size,
      total: data.at(0)?.total ?? 0,
    })

    return pagination
  }
}
