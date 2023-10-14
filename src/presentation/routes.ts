import { type Response, Router } from 'express'
import { AuthRouter } from './auth/routes.js'
import { type AuthenticatedRequest, isAuthenticated } from './middlewares/auth.js'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    // auth
    router.use('/api/auth', AuthRouter.routes)

    // private routes
    router.get('/private', isAuthenticated, (req: AuthenticatedRequest, res: Response) => {
      res.send({ route: 'private', user: req.user })
    })

    return router
  }
}
