import bcrypt from 'bcrypt'

export class BcryptAdapter {
  static async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(data, salt)
    return hash
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}
