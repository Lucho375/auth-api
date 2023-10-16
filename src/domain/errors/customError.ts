import { ZodError } from 'zod'

export class CustomError extends Error {
  constructor(
    public readonly message: any,
    public readonly statusCode: number,
    public readonly name: string
  ) {
    super(message)
  }

  static badRequest(message: string | ZodError): CustomError {
    if (message instanceof ZodError) {
      const errors = message.errors.map(error => {
        return {
          field: error.path[0],
          message: error.message
        }
      })

      return new CustomError(errors, 400, '[BadRequest Error]')
    }
    return new CustomError(message, 400, '[BadRequest Error]')
  }

  static unauthorized(message: string): CustomError {
    return new CustomError(message, 401, '[Unauthorized Error]')
  }

  static forbidden(message: string): CustomError {
    return new CustomError(message, 403, '[Forbidden Error]')
  }

  static notFound(message: string): CustomError {
    return new CustomError(message, 404, '[NotFound Error]')
  }

  static cors(): CustomError {
    return new CustomError('Not allowed by CORS', 403, '[CORS Error]')
  }
}
