import { CustomError } from '../errors/customError.js'
import { loginSchema } from '../models/loginSchema.js'

export interface ILoginCredentials {
  email: string
  password: string
}

export class LoginCredentials {
  public email: string
  public password: string

  private constructor({ email, password }: ILoginCredentials) {
    this.email = email
    this.password = password
  }

  static create(credentials: ILoginCredentials): LoginCredentials | undefined {
    const validatedCredentials = loginSchema.safeParse(credentials)
    if (validatedCredentials.success) {
      return new LoginCredentials(validatedCredentials.data)
    }

    throw CustomError.badRequest(validatedCredentials.error)
  }
}
