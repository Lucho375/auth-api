import { type NextFunction, type Response } from 'express'
import { type AuthenticatedRequest } from '../middlewares/auth.js'

export class PrivateController {
  private = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      res.status(200).send({ success: true, message: 'Private route', currentUser: req.user })
    } catch (error) {
      next(error)
    }
  }
}
