import {
  char,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { ulid } from 'ulid'
import { userTable } from './users.js'

export const postTable = mysqlTable('posts', {
  id: char('id', { length: 26 }).primaryKey().$default(ulid),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  author_id: char('author_id', { length: 26 })
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  description: varchar('description', { length: 255 }).notNull(),
  image_url: varchar('image_url', { length: 255 }),
  like_count: int('like_count').default(0).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})
