import { Router } from 'express'
import { PrivateController } from './controller.js'

export class PrivateRouter {
  static get routes(): Router {
    const router = Router()

    const controller = new PrivateController()

    router.get('/', controller.private)

    return router
  }
}
