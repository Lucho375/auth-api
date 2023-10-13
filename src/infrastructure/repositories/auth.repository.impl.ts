import { AuthDatasource } from '../../domain/datasources/auth.datasource.js'
import { IUserDto } from '../../domain/dtos/user.dto.js'
import { AuthRepository } from '../../domain/repositories/auth.repository.js'

export class AuthRepositoryImpl extends AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {
    super()
  }

  login(userCredentials: any): Promise<any> {
    return this.authDatasource.login(userCredentials)
  }

  register(userDto: IUserDto): Promise<any> {
    return this.authDatasource.register(userDto)
  }
}
