import { randomUUID } from 'node:crypto'
import { ulid } from 'ulid'
import type { Optional } from '../../utils/optional.js'

export type UserProps = {
  id: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

export class User {
  id: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
  constructor(
    props: Optional<UserProps, 'id' | 'created_at' | 'updated_at' | 'password'>
  ) {
    this.id = props.id ?? ulid()
    this.name = props.name
    this.email = props.email
    this.password = props.password ?? ''
    this.created_at = props.created_at ?? new Date()
    this.updated_at = props.updated_at ?? new Date()
  }
}
