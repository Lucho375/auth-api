import express, { Express, Router, urlencoded } from 'express'
import { Server as HTTPServer, IncomingMessage, ServerResponse } from 'http'

interface IServerOptions {
  port: number
  routes: Router
}

export class Server {
  private app: Express
  private port: number
  private routes: Router
  private serverListener?: HTTPServer<typeof IncomingMessage, typeof ServerResponse>

  constructor({ port, routes }: IServerOptions) {
    this.app = express()
    this.port = port
    this.routes = routes
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupErrorHandler()
  }

  private setupMiddlewares() {
    // this.app.use(cors())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  private setupRoutes() {
    this.app.use(this.routes)
  }

  private setupErrorHandler() {}

  close() {
    this.serverListener?.close(() => console.log('Server closed'))
  }

  listen() {
    this.serverListener = this.app.listen(this.port, () => console.log(`Server running on ${this.port}`))
  }
}
