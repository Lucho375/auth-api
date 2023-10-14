import { type ILoginCredentials } from '../dtos/login.dto.js'
import { type IUserDto } from '../dtos/user.dto.js'
import { type IUserEntity } from '../entities/user.entity.js'

export abstract class AuthRepository {
  abstract register(user: IUserDto): Promise<IUserEntity>
  abstract login(userCredentials: ILoginCredentials): Promise<string>
}
