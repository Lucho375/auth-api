import { NextFunction, Request, Response } from 'express'
import { UserDto } from '../../domain/dtos/user.dto.js'
import { AuthRepository } from '../../domain/repositories/auth.repository.js'

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = UserDto.create(req.body)
      const createdUser = await this.authRepository.register(user)
      res.send(createdUser)
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = UserDto.create(req.body)
      const createdUser = await this.authRepository.register(user)
      res.send(createdUser)
    } catch (error) {
      next(error)
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('Logout')
    } catch (error) {
      next(error)
    }
  }
}
