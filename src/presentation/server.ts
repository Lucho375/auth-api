import express, { type Express, type Router, urlencoded } from 'express'
import { type Server as HTTPServer, type IncomingMessage, type ServerResponse } from 'http'
import cookieParser from 'cookie-parser'
import { ErrorHandler } from './middlewares/errorHandler.js'

interface IServerOptions {
  port: number
  routes: Router
}

export class Server {
  private readonly app: Express
  private readonly port: number
  private readonly routes: Router
  private serverListener?: HTTPServer<typeof IncomingMessage, typeof ServerResponse>

  constructor({ port, routes }: IServerOptions) {
    this.app = express()
    this.port = port
    this.routes = routes
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupErrorHandler()
  }

  private setupMiddlewares(): void {
    // this.app.use(cors())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(cookieParser())
  }

  private setupRoutes(): void {
    this.app.use(this.routes)
  }

  private setupErrorHandler(): void {
    this.app.use(ErrorHandler)
  }

  close(): void {
    this.serverListener?.close(() => {
      console.log('Server closed')
    })
  }

  listen(): void {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on ${this.port}`)
    })
  }
}
