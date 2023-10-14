import { type AuthDatasource } from '../../domain/datasources/auth.datasource.js'
import { type ILoginCredentials } from '../../domain/dtos/login.dto.js'
import { type IUserDto } from '../../domain/dtos/user.dto.js'
import { AuthRepository } from '../../domain/repositories/auth.repository.js'

export class AuthRepositoryImpl extends AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {
    super()
  }

  async login(userCredentials: ILoginCredentials): Promise<any> {
    return await this.authDatasource.login(userCredentials)
  }

  async register(userDto: IUserDto): Promise<any> {
    return await this.authDatasource.register(userDto)
  }
}
