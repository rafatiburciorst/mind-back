import { db } from '../../../infra/database.js'
import { postTable } from '../../../infra/schemas/posts.js'
import { saveBase64Image } from '../../../utils/image.js'

type Input = {
  title: string
  description: string
  content: string
  author_id: string
  image_base64?: string
}

type Output = {}

export class CreatePost {
  async execute(input: Input): Promise<Output> {
    let filename: string | undefined
    if (input.image_base64) {
      const result = await saveBase64Image(input.image_base64)
      filename = result.filename
    }

    await db.insert(postTable).values({
      title: input.title,
      description: input.description,
      content: input.content,
      author_id: input.author_id,
      image_url: filename,
      updated_at: new Date(),
    })

    return {}
  }
}
