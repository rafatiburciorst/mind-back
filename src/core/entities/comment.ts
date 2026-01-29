import { ulid } from 'ulid'
import type { Optional } from '../../utils/optional.js'

type CommentProps = {
  id: string
  content: string
  author: string
  post_id: string
  created_at: Date
}

export class Comment {
  id: string
  content: string
  author: string
  post_id: string
  created_at: Date

  constructor(props: Optional<CommentProps, 'id' | 'created_at'>) {
    this.id = props.id ?? ulid()
    this.content = props.content
    this.author = props.author
    this.post_id = props.post_id
    this.created_at = props.created_at ?? new Date()
  }
}
