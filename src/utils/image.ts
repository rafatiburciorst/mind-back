import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

const UPLOADS_DIR = './uploads'

type SaveImageResult = {
  filename: string
  extension: string
}

export async function saveBase64Image(
  dataUri: string
): Promise<SaveImageResult> {
  const match = dataUri.match(/^data:image\/(\w+);base64,(.+)$/)
  if (!match) {
    throw new Error('Invalid image format. Expected data URI with base64.')
  }

  const [, extension, base64Data] = match
  const imageBuffer = Buffer.from(base64Data, 'base64')
  const filename = `uploads/${randomUUID()}.${extension}`

  if (!fs.existsSync(UPLOADS_DIR)) {
    await fs.promises.mkdir(UPLOADS_DIR)
  }

  await fs.promises.writeFile(`./${filename}`, imageBuffer)

  return { filename, extension }
}
