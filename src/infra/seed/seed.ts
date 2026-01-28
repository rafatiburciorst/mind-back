import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { ulid } from 'ulid'
import { db } from '../database.js'
import { commentTable } from '../schemas/comments.js'
import { postTable } from '../schemas/posts.js'
import { userTable } from '../schemas/users.js'

const USERS_COUNT = 10
const POSTS_PER_USER = 3
const COMMENTS_PER_POST = 5

async function seed() {
  console.log('Seeding database...')

  // Create users
  const users: {
    id: string
    name: string
    email: string
    password: string
    created_at: Date
    updated_at: Date
  }[] = []
  const hashedPassword = await hash('password123', 10)
  const now = new Date()

  for (let i = 0; i < USERS_COUNT; i++) {
    users.push({
      id: ulid(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: hashedPassword,
      created_at: now,
      updated_at: now,
    })
  }

  console.log(`Creating ${users.length} users...`)
  await db.insert(userTable).values(users)

  // Create posts
  const posts: {
    id: string
    title: string
    content: string
    author_id: string
    description: string
    image_url: string
    like_count: number
    created_at: Date
    updated_at: Date
  }[] = []

  for (const user of users) {
    for (let i = 0; i < POSTS_PER_USER; i++) {
      posts.push({
        id: ulid(),
        title: faker.lorem.sentence({ min: 3, max: 8 }),
        content: faker.lorem.paragraphs({ min: 2, max: 5 }),
        author_id: user.id,
        description: faker.lorem.sentence({ min: 10, max: 20 }),
        image_url: faker.image.url(),
        like_count: faker.number.int({ min: 0, max: 100 }),
        created_at: now,
        updated_at: now,
      })
    }
  }

  console.log(`Creating ${posts.length} posts...`)
  await db.insert(postTable).values(posts)

  // Create comments
  const comments: {
    id: string
    content: string
    author_id: string
    post_id: string
    like_count: number
    created_at: Date
    updated_at: Date
  }[] = []

  for (const post of posts) {
    for (let i = 0; i < COMMENTS_PER_POST; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)]
      comments.push({
        id: ulid(),
        content: faker.lorem.paragraph(),
        author_id: randomUser.id,
        post_id: post.id,
        like_count: faker.number.int({ min: 0, max: 50 }),
        created_at: now,
        updated_at: now,
      })
    }
  }

  console.log(`Creating ${comments.length} comments...`)
  await db.insert(commentTable).values(comments)

  console.log('Seeding completed!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
