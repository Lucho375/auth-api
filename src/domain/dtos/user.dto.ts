import { userSchema } from '../models/userSchema.js'

export interface IUserDto {
  firstname: string
  lastname: string
  email: string
  password: string
  age: number
}

export class UserDto {
  public firstname: string
  public lastname: string
  public email: string
  public password: string
  public age: number

  private constructor({ age, email, firstname, lastname, password }: IUserDto) {
    this.age = age
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.password = password
  }

  static create(user: IUserDto) {
    const validatedUser = userSchema.parse(user)
    return new UserDto(validatedUser)
  }
}
