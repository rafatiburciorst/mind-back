import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../../env.js'

interface JwtPayload {
  sub: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ message: 'Token not provided' })
    return
  }

  const [, token] = authHeader.split(' ')

  if (!token) {
    res.status(401).json({ message: 'Token malformed' })
    return
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
