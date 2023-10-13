import { IUserDto } from '../dtos/user.dto.js'

export abstract class AuthRepository {
  abstract register(user: IUserDto): Promise<any>
  abstract login(userCredentials: any): Promise<any>
}
