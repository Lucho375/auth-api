import { userModel } from '../../data/models/user.model.js'
import { AuthDatasource } from '../../domain/datasources/auth.datasource.js'
import { type ILoginCredentials } from '../../domain/dtos/login.dto.js'
import { type IUserDto } from '../../domain/dtos/user.dto.js'
import { UserEntity, type IUserEntity } from '../../domain/entities/user.entity.js'
import { CustomError } from '../../domain/errors/customError.js'
import { BcryptAdapter } from '../adapters/bcryptAdapter.js'
import { JwtAdapter } from '../adapters/jwtAdapter.js'

type THashPassword = (str: string) => Promise<string>
type TComparePassword = (str: string, hash: string) => Promise<boolean>
type TGenerateToken = (object: Record<string, unknown>) => Promise<string>
export type Token = string

export class AuthDatasourceImpl extends AuthDatasource {
  constructor(
    private readonly hashPassword: THashPassword = BcryptAdapter.hash,
    private readonly comparePassword: TComparePassword = BcryptAdapter.compare,
    private readonly generateToken: TGenerateToken = JwtAdapter.generateToken
  ) {
    super()
  }

  async register({ email, password, ...rest }: IUserDto): Promise<IUserEntity> {
    const userExists = await userModel.findOne({ email })

    if (userExists !== null) {
      throw CustomError.badRequest('User already exists')
    }

    const createdUser = await userModel.create({ ...rest, email, password: await this.hashPassword(password) })
    return new UserEntity({ ...createdUser.toObject(), id: createdUser._id.toString() })
  }

  async login({ email, password }: ILoginCredentials): Promise<string> {
    const user = await userModel.findOne({ email })

    if (user === null) {
      throw CustomError.notFound('User not found')
    }

    const isValidPassword = await this.comparePassword(password, user.password)

    if (!isValidPassword) {
      throw CustomError.badRequest('Invalid password')
    }

    const token = await this.generateToken({ id: user._id, firstname: user.firstname, email: user.email })

    return token
  }
}
