import jwt from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'
import { CustomError } from '../../domain/errors/customError.js'

const { JsonWebTokenError, TokenExpiredError } = jwt

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ success: false, message: err.message })
  }
  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
    return res.status(401).send({ success: false, message: 'Invalid token provided' })
  }

  // unhandled
  res.status(500).send({ success: false, message: 'Internal Server Error' })
}
