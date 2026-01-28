import { char, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulid'

export const userTable = mysqlTable('users', {
  id: char('id', { length: 26 }).primaryKey().$default(ulid),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})
