import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { db } from '../../../infra/database.js'
import { postTable } from '../../../infra/schemas/posts.js'

type Input = {
  title: string
  description: string
  content: string
  author_id: string
  image_url?: string
}

type Output = {}

export class CreatePost {
  async execute(input: Input): Promise<Output> {
    let filename: string | undefined
    if (input.image_url) {
      const imageBuffer = Buffer.from(input.image_url, 'base64')
      filename = `/uploads/${randomUUID()}.png`
      if (!fs.existsSync('./uploads')) {
        await fs.promises.mkdir('./uploads')
      }
      await fs.promises.writeFile(`./uploads/${filename}`, imageBuffer)
    }

    await db.insert(postTable).values({
      title: input.title,
      description: input.description,
      content: input.content,
      author_id: input.author_id,
      image_url: filename,
    })

    return {}
  }
}
