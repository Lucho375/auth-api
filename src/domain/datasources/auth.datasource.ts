export abstract class AuthDatasource {
  abstract login(loginCredentials: any): Promise<any>
  abstract register(userDto: any): Promise<any>
}
