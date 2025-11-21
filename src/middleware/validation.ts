import type { Request, Response, NextFunction } from 'express'
import { type ZodSchema, ZodError } from 'zod'

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = schema.parse(req.body)
      req.body = validatedBody

      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid request body',
          details: err.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        })
      }
      next(err)
    }
  }
}

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params)
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid request params',
          details: err.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        })
      }
      next(err)
    }
  }
}

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query)
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid request query params',
          details: err.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        })
      }
      next(err)
    }
  }
}
