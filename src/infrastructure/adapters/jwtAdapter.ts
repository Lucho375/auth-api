import jwt from 'jsonwebtoken'
import { envs } from '../../config/index.js'

export class JwtAdapter {
  static async generateToken(payload: Record<string, unknown>, duration: string = '1hr'): Promise<string> {
    return await new Promise((resolve, reject) => {
      jwt.sign(payload, envs.JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err instanceof Error) reject(err)
        resolve(token as string)
      })
    })
  }

  static async validateToken<T>(token: string): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err instanceof Error) reject(err)
        resolve(decoded as T)
      })
    })
  }
}
