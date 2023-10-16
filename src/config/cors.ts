import { type CorsOptions } from 'cors'
// import { CustomError } from '../domain/errors/customError.js'

// const whitelist = ['https://react-auth-example-sandy.vercel.app/', 'https://react-auth-example-sandy.vercel.app']
export const corsOptions: CorsOptions = {
  // origin: (origin, callback) => {
  //   if (typeof origin === 'string' && (whitelist.includes(origin) || origin === undefined)) {
  //     callback(null, true)
  //   } else {
  //     callback(CustomError.cors())
  //   }
  // },
  origin: 'https://react-auth-example-sandy.vercel.app/',
  credentials: true
}
