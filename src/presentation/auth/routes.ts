import { Router } from 'express'
import { AuthController } from './controller.js'
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repository.impl.js'
import { AuthDatasourceImpl } from '../../infrastructure/datasources/auth.datasource.impl.js'

export class AuthRouter {
  static get routes() {
    const router = Router()

    /**
     * 1_acceso de datos
     * 2_implementacion(logica)
     * 3_controller
     */
    const datasource = new AuthDatasourceImpl()
    const repository = new AuthRepositoryImpl(datasource)
    const controller = new AuthController(repository)

    // prettier-ignore
    router
      .post('/register', controller.register)
      .post('/login', controller.login)
      .post('/logout', controller.logout)

    return router
  }
}
