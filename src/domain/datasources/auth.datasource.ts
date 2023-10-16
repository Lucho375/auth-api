import { type IUserCredentials } from '../../infrastructure/datasources/auth.datasource.impl.js'
import { type UserEntity } from '../entities/user.entity.js'

export abstract class AuthDatasource {
  abstract login(loginCredentials: any): Promise<IUserCredentials>
  abstract register(userDto: any): Promise<UserEntity>
}
