import { type NextFunction, type Request, type Response } from 'express'
import { type ILoginCredentials, LoginCredentials } from '../../domain/dtos/login.dto.js'
import { type IUserDto, UserDto } from '../../domain/dtos/user.dto.js'
import { type AuthRepository } from '../../domain/repositories/auth.repository.js'
import { CustomError } from '../../domain/errors/customError.js'
import { JwtAdapter } from '../../infrastructure/adapters/jwtAdapter.js'

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = UserDto.create(req.body)
      const createdUser = await this.authRepository.register(user as IUserDto)
      res.status(201).send({ success: true, payload: createdUser })
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const credentials = LoginCredentials.create(req.body)
      const token = await this.authRepository.login(credentials as ILoginCredentials)
      res
        .cookie('token', token.token, { httpOnly: true, secure: true, maxAge: 3600000, sameSite: 'none' }) // 3.600.000 = 1hour
        .status(200)
        .send({ success: true, ...token })
    } catch (error) {
      next(error)
    }
  }

  logout = (req: Request, res: Response, next: NextFunction): Response | undefined => {
    try {
      const cookies = req?.cookies
      const responseMessage = { success: true, message: 'Logout success' }

      if (cookies.token === null || cookies.token === undefined) {
        return res.status(200).send(responseMessage)
      }
      // prettier-ignore
      res
        .clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' })
        .status(200)
        .send(responseMessage)
    } catch (error) {
      next(error)
    }
  }

  getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cookies = req.cookies
      if (typeof cookies.token !== 'string') {
        throw CustomError.unauthorized('Unauthorized request')
      }
      const decoded = await JwtAdapter.validateToken<{
        id: string
        firstname: string
        lastname: string
        email: string
        iat: number
        exp: number
      }>(cookies.token)
      res.status(200).send({
        success: true,
        token: cookies.token,
        user: {
          id: decoded.id,
          firstname: decoded.firstname,
          email: decoded.email,
          lastname: decoded.lastname
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
