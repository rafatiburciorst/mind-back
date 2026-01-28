import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { env } from '../env.js'

const poolConnection = mysql.createPool({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: 3306,
})
const db = drizzle({ client: poolConnection })

export { db }
