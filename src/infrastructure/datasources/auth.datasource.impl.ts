import { AuthDatasource } from '../../domain/datasources/auth.datasource.js'

export class AuthDatasourceImpl extends AuthDatasource {
  constructor() {
    super()
  }

  async register(userDto: any): Promise<any> {}

  async login(loginCredentials: any): Promise<any> {}
}
