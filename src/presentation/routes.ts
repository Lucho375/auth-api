import { Router } from 'express'
import { AuthRouter } from './auth/routes.js'
import { isAuthenticated } from './middlewares/auth.js'
import { PrivateRouter } from './private/routes.js'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    // public routes
    router.use('/api/auth', AuthRouter.routes)
    // private routes
    router.use('/api/private', isAuthenticated, PrivateRouter.routes)
    router.use('*', (_req, res) => res.status(404).send({ error: 'Resource not found' }))

    return router
  }
}
