import { Router } from 'express'
import { AuthRouter } from './auth/routes.js'

export class AppRouter {
  static get routes() {
    const router = Router()

    // auth
    router.use('/api/auth', AuthRouter.routes)

    return router
  }
}
