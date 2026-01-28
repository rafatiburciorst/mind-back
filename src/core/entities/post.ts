import { randomUUID } from 'node:crypto'
import { ulid } from 'ulid'
import type { Optional } from '../../utils/optional.js'

type PostProps = {
  id: string
  title: string
  description: string
  content: string
  author_id: string
  image_url?: string
  created_at: Date
  updated_at: Date
}

export class Post {
  id: string
  title: string
  description: string
  content: string
  author_id: string
  image_url?: string
  created_at: Date
  updated_at: Date

  constructor(props: Optional<PostProps, 'id' | 'created_at' | 'updated_at'>) {
    this.id = props.id ?? ulid()
    this.title = props.title
    this.description = props.description
    this.content = props.content
    this.author_id = props.author_id
    this.image_url = props.image_url
    this.created_at = props.created_at ?? new Date()
    this.updated_at = props.updated_at ?? new Date()
  }
}
