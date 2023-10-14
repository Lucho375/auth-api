export interface IUserEntity {
  age: number
  createdAt: Date
  email: string
  firstname: string
  id: string
  lastname: string
  password: string
  updatedAt: Date
}

export class UserEntity {
  public age: number
  public createdAt: Date
  public email: string
  public firstname: string
  public id: string
  public lastname: string
  public password: string
  public updatedAt: Date

  constructor({ firstname, lastname, email, password, age, createdAt, updatedAt, id }: IUserEntity) {
    this.age = age
    this.createdAt = createdAt
    this.email = email
    this.firstname = firstname
    this.id = id
    this.lastname = lastname
    this.password = password
    this.updatedAt = updatedAt
  }
}
