import { type NextFunction, type Request, type Response } from 'express'
import { CustomError } from '../../domain/errors/customError.js'
import { JwtAdapter } from '../../infrastructure/adapters/jwtAdapter.js'

interface IToken {
  id: string
  firstname: string
  email: string
  iat: number
  exp: number
}

export interface AuthenticatedRequest extends Request {
  user?: IToken
}

export async function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization ?? req.headers.Authorization
    if (authHeader === undefined) {
      throw CustomError.unauthorized('No auth header provided') // 401
    }
    const token = (authHeader as string)?.split(' ')[1]
    const user = await JwtAdapter.validateToken<IToken>(token)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
