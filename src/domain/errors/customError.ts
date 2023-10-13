export class CustomError extends Error {
  constructor(public readonly message: string, public readonly statusCode: number, public readonly name: string) {
    super(message)
  }

  static badRequest(message: string) {
    throw new CustomError(message, 400, '[BadRequest Error]')
  }

  static unauthorized(message: string) {
    throw new CustomError(message, 401, '[Unauthorized Error]')
  }

  static forbidden(message: string) {
    throw new CustomError(message, 403, '[Forbidden Error]')
  }

  static notFound(message: string) {
    throw new CustomError(message, 404, '[NotFound Error]')
  }
}
