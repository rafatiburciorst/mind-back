import { char, int, mysqlTable, text, timestamp } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulid'
import { postTable } from './posts.js'
import { userTable } from './users.js'

export const commentTable = mysqlTable('comments', {
  id: char('id', { length: 26 }).primaryKey().$default(ulid),
  content: text('content').notNull(),
  author_id: char('author_id', { length: 26 })
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  post_id: char('post_id', { length: 26 })
    .references(() => postTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  like_count: int('like_count').default(0).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})
