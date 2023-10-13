import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../domain/errors/customError.js'

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ message: err.message })
  }
  res.status(500).send('Internal Server Error')
}
