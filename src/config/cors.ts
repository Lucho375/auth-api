import { type CorsOptions } from 'cors'
import { CustomError } from '../domain/errors/customError.js'

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173']
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (typeof origin === 'string' && (whitelist.includes(origin) || origin === undefined)) {
      callback(null, true)
    } else {
      callback(CustomError.cors())
    }
  },
  credentials: true
}
