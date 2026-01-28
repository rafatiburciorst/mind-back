import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'

interface ValidateSchemas {
  body?: ZodType
  query?: ZodType
  params?: ZodType
}

export function validate(schemas: ValidateSchemas) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body)
      }
      if (schemas.query) {
        Object.assign(req.query, await schemas.query.parseAsync(req.query))
      }
      if (schemas.params) {
        Object.assign(req.params, await schemas.params.parseAsync(req.params))
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
